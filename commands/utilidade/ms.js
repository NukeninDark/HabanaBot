module.exports = {
    name: 'ms',
    description: 'Mostra o tempo de resposta do bot!',
    cooldown: 1,
    execute(message, args) {
        message.channel.send(`Tempo de resposta do Websocket: ${message.client.ws.ping}ms.`);

        message.channel.send('Testando..').then(sent => {
            sent.edit(`Tempo de demora Ida e volta: ${sent.createdTimestamp - message.createdTimestamp}ms`);
        });
    },
};
