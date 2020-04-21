const MockedSocket = require('socket.io-mock');

describe('Socket.io', () => {
    test('should respond to a ping', function (done) {
        const socket = new MockedSocket();

        socket.on('pingTest', (message) => {
            expect(message).toBe('pong');
            done();
        });
        socket.socketClient.emit('pingTest', 'pong');
    });
});
