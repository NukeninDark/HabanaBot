//const Discord = require('discord.js');

module.exports = {
    name: 'resetavatar',
    aliases: [`rsta`],
    description: 'Eu irei retornar o meu avatar para a imagem original.',
    globalcooldowns: true,
    execute(message, args) {
            return message.client.user.setAvatar('https://i.imgur.com/v4lM1ij.jpg').then(()=>{
                message.reply(`Avatar resetado com sucesso!`)})
    },
};