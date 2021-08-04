module.exports = {
	name: 'server',
	description: 'Mostra informações sobre esta guilda.',
	execute(message) {
		message.channel.send(`Nome da Guilda: ${message.guild.name}\nNúmero total de Membros: ${message.guild.memberCount}`);
	},
};
