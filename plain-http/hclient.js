require('dotenv').config()
const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sendCommand(command) {
  const options = {
    hostname: process.env.HOST_NAME,

    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(command),
    },
  };

  const req = https.request(options, (res) => {
    res.on('data', (data) => {
      console.log(data.toString());
    });
    res.on('end', () => {
      promptForCommand(); // Prompt for next command
    });
  });

  req.on('error', (error) => {
    console.error(`Error sending command: ${error.message}`);
    rl.close();
  });

  req.write(command);
  req.end();
}

function promptForCommand() {
  console.log('Prompting for command...');
  rl.question('Enter command: ', (command) => {
    sendCommand(command.trim());
  });
}

promptForCommand();
