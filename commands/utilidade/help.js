const Discord = require('discord.js');
const {
    prefix
} = require('../../config.json');
const {
    Thigas
} = require('../chifres/fotos.json');
const {
    randomThigas
} = require('../chifres/thigas.js');

module.exports = {
    name: 'help',
    aliases: ['h', '?', 'commands', 'comandos', 'wq'],
    description: 'Mostra informações de um comando especifico!',
    usage: '<comando>',
    execute(message, args) {
        const {
            commands
        } = message.client;
        const ID = randomThigas();
        if (!args.length) {
            const comandos = commands.map(command => command.name).join(', ')
            const Embed1 = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Aqui está uma lista de todos os comandos')
                //.setDescription('Aqui está uma lista de todos os comandos')
                .addFields({
                    name: '**Comandos:**',
                    value: `**${comandos}**`
                }, {
                    name: `Para mais informações de um comando`,
                    value: `\`${prefix}help [comando nome]\``
                })
                .setImage(Thigas[ID].url)
                .setTimestamp()
                //.setAuthor('NukeninDark', 'https://i.imgur.com/FOQ5AgN.jpg?1')
                .setFooter(Thigas[ID].mensagem, 'https://i.imgur.com/15Fldja.png?1');

            return message.channel.send(Embed1);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Não existe este comando!');
        }

        (command.aliases) ? (aliasesCommands = command.aliases.join(', ')) : (aliasesCommands = 'Nenhum')
        if (!command.description) {
            command.description = `Não possui descrição`
        }
        if (!command.usage) {
            command.usage = ``
        }

        const EmbedH = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Todas as informações do comando')
            //.setDescription('Aqui está uma lista de todos os comandos')
            .addFields({
                name: '**Nome:**',
                value: command.name
            }, {
                name: `**Aliases:**`,
                value: aliasesCommands
            }, {
                name: `**Descrição:**`,
                value: command.description
            }, {
                name: `**Uso:**`,
                value: `${prefix}${command.name} ${command.usage}`
            }, {
                name: `**Cooldown:**`,
                value: `${command.cooldown || 1} segundo(s)`
            })
            .setImage(Thigas[ID].url)
            .setTimestamp()
            //.setAuthor('NukeninDark', 'https://i.imgur.com/FOQ5AgN.jpg?1')
            .setFooter(Thigas[ID].mensagem, 'https://i.imgur.com/15Fldja.png?1');

        return message.channel.send(EmbedH);
    },
};
