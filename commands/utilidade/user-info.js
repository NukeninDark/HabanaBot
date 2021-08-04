module.exports = {
	name: 'user-info',
	description: 'Mostra algumas informações suas.',
	execute(message) {
		message.channel.send(`Seu usuario: ${message.author.username}\nSeu ID: ${message.author.id}`);
	},
};
