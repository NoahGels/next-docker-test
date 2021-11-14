import {Server} from "socket.io";

let counter = 0;

export default function ioHandler(req, res) {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', socket => {

      socket.broadcast.emit('a user connected');

      socket.on('hello', msg => {
        socket.emit('hello', 'world!');
      });

      socket.on('increase', () => {
        console.log('Got it');
        counter++;
        socket.broadcast.emit('increase', counter);
        socket.emit('increase', counter);
      });

    });

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false
  }
}
