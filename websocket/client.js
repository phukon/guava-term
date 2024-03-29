const WebSocket = require('ws');
const readline = require('readline');

function connectWebSocketClient() {

  const ws = new WebSocket('ws://localhost:8080'); // point to your server before running

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  ws.on('open', () => {
    console.log('Connected to WebSocket server');
    rl.prompt(); 
  });

  ws.on('message', (data) => {
    console.log(data.toString()); // Convert binary data to string before logging
    rl.prompt(); 
  });

  ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
    rl.close();
  });


  rl.on('line', (line) => {
    console.log(`Sending command: ${line}`); 
    ws.send(line);
  });
}

connectWebSocketClient();
