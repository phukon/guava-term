const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.text()); // Parse text/plain requests

app.post('/', (req, res) => {
  const command = req.body.trim();
  console.log(`Received command: ${command}`);

  const shellCommand = process.platform === 'win32' ? 'cmd' : 'bash';
  const child = spawn(shellCommand);

  child.stdin.write(command + '\n');
  child.stdin.end();

  let stderrData = ''; // Store stderr data

  // Capture stdout
  child.stdout.on('data', (stdoutData) => {
    res.write(stdoutData);
  });

  // Capture stderr
  child.stderr.on('data', (stderrChunk) => {
    stderrData += stderrChunk.toString(); // Append stderr data
  });

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    res.end(stderrData); // Send stderr data as part of response
  });

  child.on('error', (error) => {
    console.error(`Error spawning child process: ${error.message}`);
    res.status(500).send(`Error spawning child process: ${error.message}`);
  });
});

app.get('/', (req, res) => {
  res.send('Server running');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});
