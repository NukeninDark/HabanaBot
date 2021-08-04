const Discord = require('discord.js');
const {Dandan} = require('./fotos.json');
const fs = require('fs');
var configs = require('../../config.json');

var ID = 0

//Database
// const sequelize = new Sequelize('database', 'user', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	logging: false,
// 	// SQLite only
// 	storage: 'database.sqlite',
// });


function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function atualizarJSON() {
    fs.writeFile('./config.json', JSON.stringify(configs, null, 4), (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        }
    });
}

function retirarPrimeironumeroArray(){
    configs.numerosDiaDandan.shift();
    if (configs.numerosDiaDandan[0] == undefined) {
        for (let i = 0; i < Dandan.length; i++) {
            configs.numerosDiaDandan.push(i);
        }
        shuffleArray(configs.numerosDiaDandan);
    }
    ID = configs.numerosDiaDandan[0];
}

function enviarMensagem(message, args){
	return message.reply(`${Dandan[ID].mensagem}`, new Discord.MessageAttachment(Dandan[ID].url));
}

function atualizandoMensagem(message, numero) {
    atualizarJSON();
    return message.reply(`A mensagem de Dandan foi atualizada com sucesso! Foi retiradas ${numero}`);
}

module.exports = {

	name: 'dandan',
    aliases: ['dan'],
	description: 'Descubra qual é o pensamento de hoje com o Dandan!',
    usage: '[!dandan ou !dan]',
	execute(message, args){

        const date = new Date();
        const diaAtual = date.getDate()

        if(configs.dia != diaAtual){
            retirarPrimeironumeroArray();
            configs.dia = diaAtual;
            atualizarJSON();
        } else {
            ID = configs.numerosDiaDandan[0]
        }
		enviarMensagem(message, args);
	},

    atualizarDia(message, args){
        var numero;

        if (isNaN(args[0])) {
            if(args[0] == 'a'){
                numero = Object.keys(configs.numerosDiaDandan).length
            } else if (args[0] === undefined) {
                numero = 1;
            } else {
                return message.reply(`Não é um número!`)
            }
        } else {
            numero = parseInt(args[0])
        }

        if(numero > 1){
            for (let i = 0; i < numero; i++) {
                retirarPrimeironumeroArray();
            }
        atualizandoMensagem(message, numero);
        } else if(numero <= 0) {
            return message.reply('O número para atualizar não pode ser zero ou menor!');
        } else {
            retirarPrimeironumeroArray();
            atualizandoMensagem(message, numero);
        }
    }
        
};