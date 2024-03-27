const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Handle WebSocket events
ws.on('open', () => {
  console.log('Connected to WebSocket server');
  
  // Send a message to the server
  ws.send('Hello from client');
});

ws.on('message', (data) => {
  console.log('Received from server:', data);
});

ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
});
