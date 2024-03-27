const { WebSocketServer } = require('ws');
const { spawn } = require('child_process');

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });

// Function to spawn a child process and handle interaction
function spawnChildProcess(ws) {
 // Determine the shell command based on the platform
 const shellCommand = process.platform === 'win32' ? 'cmd' : 'bash';

 // Spawn a child process with inherited stdio
 const child = spawn(shellCommand, [], { stdio: 'inherit' });

 // Check if child.stdin is not null before attaching the event listener
 if (child.stdin) {
    // Forward data from WebSocket to child process
    ws.on('message', (data) => {
       child.stdin.write(data);
    });
 } else {
    console.error('Child process does not have a standard input stream.');
 }

 // Check if child.stdout is not null before attaching the event listener
 if (child.stdout) {
    // Forward data from child process to WebSocket
    child.stdout.on('data', (data) => {
      ws.send(data.toString());
    });
 } else {
    console.error('Child process does not have a standard output stream.');
 }

 // Handle child process exit
 child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    ws.close();
 });

 // Handle errors from the child process
 child.on('error', (error) => {
    console.error(`Child process encountered an error: ${error.message}`);
    ws.close();
 });
}



// Handle WebSocket connections
wss.on('connection', (ws) => {
 console.log('Client connected');
 spawnChildProcess(ws);

 // Handle WebSocket disconnection
 ws.on('close', () => {
    console.log('Client disconnected');
 });
});

console.log('WebSocket server running on port 8080');
