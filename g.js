const { spawn } = require('child_process');

// Determine the shell command based on the platform
const shellCommand = process.platform === 'win32' ? 'cmd.exe' : 'bash';

// Spawn a child process to launch an interactive shell
const child = spawn(shellCommand, ['-i'], { stdio: 'pipe' });

// Handle errors during spawning
child.on('error', (err) => {
    console.error('Failed to spawn child process:', err);
});

// Log child process events
child.stdout.on('data', (data) => {
    console.log('Child process stdout:', data.toString());
});

child.stderr.on('data', (data) => {
    console.error('Child process stderr:', data.toString());
});

// Check if child.stdin is not null before writing to it
if (child.stdin) {
    // Write additional commands to the child process stdin
    console.log('Writing commands to child process stdin');
    child.stdin.write('pwd\n'); // Print current working directory
    child.stdin.write('echo Hello from child process\n'); // Print a message
} else {
    console.error('Child process does not have a standard input stream.');
}

// Handle child process exit
child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
});
