const Discord = require('discord.js');
const {
    Thigas
} = require('./fotos.json');

module.exports = {

    name: 'thigas',
    aliases: ['th'],
    description: 'Descubra que Thigas você é!',
    globalcooldowns: false,
    execute(message, args) {
        const ID = this.randomThigas();

        return message.reply(`${Thigas[ID].mensagem}`, new Discord.MessageAttachment(Thigas[ID].url));
    },

    randomThigas() {
        return Math.floor((Math.random() * Thigas.length));
    },
};
