//const Discord = require('discord.js');

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return message.client.users.cache.get(mention);
	}
}

module.exports = {
    name: 'steal',
    aliases: [`st`],
    description: 'Eu irei pegar o seu Avatar ou o mencionado e utilizarei como sendo o meu!',
    globalcooldowns: true,
    execute(message, args) {
        if (args[0]) {
            const user = getUserFromMention(args[0]);

            if (!user) {
                return message.reply('Por favor, mencione alguem para que eu possa roubar o seu avatar!');
            }

            message.client.user.setAvatar(user.displayAvatarURL({ dynamic: true })).then(()=>{
            message.reply(`Avatar roubado com sucesso!`)});
        } else {
            return message.client.user.setAvatar(message.author.displayAvatarURL({ dynamic: true })).then(()=>{
                message.reply(`Avatar roubado com sucesso!`)});
        }
    },
};