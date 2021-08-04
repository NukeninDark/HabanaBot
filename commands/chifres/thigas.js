const Discord = require('discord.js');
const {Thigas} = require('./fotos.json');

module.exports = {

	name: 'thigas',
	aliases: ['th'],
	description: 'Descubra que Thigas você é!',
	globalcooldowns: false,
	execute(message, args){
		const ID = this.randomThigas();

		const attachment = new Discord.MessageAttachment(`./Fotos/thigas/${Thigas[ID].Nome}.${Thigas[ID].tipo}`);
		return message.reply(`${Thigas[ID].mensagem}`, attachment);
	},

	randomThigas() {
		return Math.floor((Math.random() * Thigas.length));
	},
};