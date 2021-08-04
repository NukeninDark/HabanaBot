const Discord = require('discord.js');
const package = require('../../package.json');
const {changes, footer} = require('../../changelog.json');

module.exports={
    name: `changelog`,
    aliases: [`ch`, `log`],
    description: `Mostra as mudanças desde a ultima atualização do bot. Se quiser saber a versão atual do bot, utilize o armumento **'v'**`,
    cooldown: 10,
    execute(message, args){
        var logEmbed = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle('Notas da atualização')
            //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription(`Versão do bot: ${package.version}`)
            .setThumbnail('https://i.imgur.com/v4lM1ij.jpg')
            .setTimestamp()
            .setFooter(footer, message.client.user.displayAvatarURL())
        
        for (let i = 0; i < changes.length; i++) {
            logEmbed.addField('\u200B', changes[i], false);
        }

        return message.channel.send(logEmbed);
        
    }
}