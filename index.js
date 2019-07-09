const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UsersService = require('./UsersService');

const usersService = new UsersService();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        usersService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: usersService.getAllUsers()
        });
    });
});

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        const { name } = usersService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name
        });
    });
    // the client listens to the chat input message
    socket.on('join', (name) => {
        // we save the user who appeared in the application to the website holding the list of people in the chat
        usersService.addUser({
            id: socket.id,
            name
        });
        // the application emits an update event that updates information about the list of users to everyone listening to the 'update' event
        io.emit('update', {
            users: usersService.getAllUsers()
        });
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});