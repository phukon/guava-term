<img alt=" Interact with your Vercel deployment's build container through it's bash terminal." src="https://github.com/phukon/guava/assets/60285613/e352cda2-5df6-477f-a1b0-5a5a7b9f5eeb">

<h3 align="center">guava-term</h3>

<p align="center">
    Interact with your Vercel deployment's build container through it's bash terminal
    <br />
    <a href="#http-implementation"><strong>HTTP</strong></a> ·
    <a href="#websocket-implementation"><strong>WebSocket</strong></a> ·
</p>

<br/>

This project enables remote interaction with a Vercel Build container through it's bash terminal using child processes. I initially wrote this to explore the remote environment and use the `/temp` directory of a Vercel Build Docker container. {see more @ [Vercel Builds](https://vercel.com/docs/deployments/builds) }

For a Next.js implementation, check [guava-next](https://github.com/phukon/guava-next)

## HTTP implementation

dir: `plain-http` + root `index.js`
Everything is stateless on the `HTTP` implementation. The `child process` is killed after every command or should I say for every new command, a new `child process` is spun up.

## WebSocket implementation

dir: `websocket`
All commands are piped to the same `child process`.

## Getting Started

To set up and run the application, follow these steps:

### HTTP

1.  `pnpm install`
2.  Set `HOST_NAME` in `.env`
3.  Then `node index.js` to spin up the server.
4.  Finally `node plain-http/hclient.js` to start the client.

### Websocket

1. Run `node websocket/index.js` to spin up the server.
2. Point to your server address in `websocket/client.js`
3. Then `node websocket/client.js`to use the websocket client.

### Usage

#### Server Side

1.  Run the server:

    `node hclient.js`

    The server will start listening on port 8080.

#### Client Side

1.  Run the client:

    `node client.js`

    This will prompt you to enter a command.

2.  Enter the desired command and press Enter.

    The command will be sent to the server, executed in a bash terminal, and the output will be displayed in the client console.
