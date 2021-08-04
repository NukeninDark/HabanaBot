module.exports = {
	name: 'avatar',
	description: 'Pega a URL do seu avatar ou de um membro.',
	aliases: ['icon'],
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Seu avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `Avatar de ${user.username}: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	},
};
