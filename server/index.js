const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
    
const app = express();
const server = createServer(app);

const io = new Server(server , {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("Alguien se conectó");
    // Mensajes a todos
    socket.emit("mensaje", "Bienvenido al chat");

    socket.on("mensaje", (mensaje) => {
        // A todos los que estén conectados
        // io.emit("mensaje", mensaje);

        // A todos excepto a mí
        socket.broadcast.emit("mensaje", mensaje);
    })
})

server.listen(3000, () => {
	console.log("Corriendo");
});
