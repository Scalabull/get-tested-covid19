module.exports = (io) => {
    io.on('connect', (socket) => {
        socket.on('disconnect', () => {});

        socket.on('pingTest', () => {
            socket.emit('ping', 'pong');
        });
    });
};
