const { WebSocketServer } = require('ws');
const { spawn } = require('child_process');

const wss = new WebSocketServer({ port: 8080 });

function spawnChildProcess(ws) {
  const shellCommand = process.platform === 'win32' ? 'cmd' : 'bash';

  const child = spawn(shellCommand, [], {
    stdio: ['pipe', 'pipe', process.stderr],
  });

  if (child.stdin) {
    ws.on('message', (data) => {
      const comm = data.toString();
      console.log(comm);

      child.stdin.write(comm + '\n');
    });
  } else {
    console.error('Child process does not have a standard input stream.');
  }

  if (child.stdout) {
    child.stdout.on('data', (data) => {
      ws.send(data.toString());
    });
  } else {
    console.error('Child process does not have a standard output stream.');
  }

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    ws.close();
  });

  child.on('error', (error) => {
    console.error(`Child process encountered an error: ${error.message}`);
    ws.close();
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  spawnChildProcess(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 8080');
