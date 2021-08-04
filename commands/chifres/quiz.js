const Discord = require("discord.js");
const { perguntas } = require("./configs/perguntasQuiz.json");
//const Sequelize = require("sequelize");
//const { Users } = require("../../database/dbObjects.js");

module.exports = {
	name: "quiz",
	description: `Descubra se você é mais Lana ou Julia.`,
	execute(message, args) {
		message.reply("Vai começar o quiz de Laninha e Julinha!");
		let perguntaAtual = 0,
			laninhaPontos = 0,
			julinhaPontos = 0;
		this.perguntaQuiz(message, perguntaAtual, laninhaPontos, julinhaPontos);
	},

	async perguntaQuiz(message, perguntaAtual, laninhaPontos, julinhaPontos) {
		const quizEmbed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle("Quiz da Gêmeas")
			.setDescription("\u200B")
			.setThumbnail(perguntas[perguntaAtual].thumbnail)
			.setImage(perguntas[perguntaAtual].image)
			.setTimestamp()
			.setFooter(
				message.author.username,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.addFields(
				{
					name: perguntas[perguntaAtual].pergunta,
					value: "\u200b",
					inline: false,
				},
				//{ name: '\u200B', value: '\u200B', inline: false },
				{
					name: "🇦",
					value: `**${perguntas[perguntaAtual].A}**`,
					inline: true,
				},
				{ name: "\u200B", value: "\u200B", inline: true },
				{
					name: "🇧",
					value: `**${perguntas[perguntaAtual].B}**`,
					inline: true,
				},
				{ name: "\u200B", value: "\u200B", inline: false },
				{
					name: "🇨",
					value: `**${perguntas[perguntaAtual].C}**`,
					inline: true,
				},
				{ name: "\u200B", value: "\u200B", inline: true },
				{
					name: "🇩",
					value: `**${perguntas[perguntaAtual].D}**`,
					inline: true,
				}
			);

		message.reply(quizEmbed).then( (sentMessage) => {
			const emojis = ["🇦", "🇧", "🇨", "🇩"];
			emojis.forEach(async (emoji) => {
				await sentMessage.react(emoji);
			});

			const filter = (reaction, user) =>
				(reaction.emoji.name === emojis[0] ||
					reaction.emoji.name === emojis[1] ||
					reaction.emoji.name === emojis[2] ||
					reaction.emoji.name === emojis[3]) &&
				user.id === message.author.id;
			const collector = sentMessage.createReactionCollector(filter, {
				time: 60000,
				max: 1,
			});
			collector.on("collect", async (r) => {
				if (
					r.emoji.name === perguntas[perguntaAtual].Lana[0] ||
					r.emoji.name === perguntas[perguntaAtual].Lana[1]
				) {
					message.reply(`Laninha ${r.emoji.name}`);
					laninhaPontos++;
				} else if (
					r.emoji.name === perguntas[perguntaAtual].Julia[0] ||
					r.emoji.name === perguntas[perguntaAtual].Julia[1]
				) {
					message.reply(`Julinha ${r.emoji.name}`);
					julinhaPontos++;
				}

				if (perguntaAtual < perguntas.length - 1) {
					this.perguntaQuiz(
						message,
						++perguntaAtual,
						laninhaPontos,
						julinhaPontos
					);
				} else {
					if (laninhaPontos > julinhaPontos) {
						laninhaPontos / perguntas.length < 0.6
							? message.reply(
									`Laninha are the champion! Lana: ${laninhaPontos}, Julia: ${julinhaPontos}, Porcentagem: ${
										laninhaPontos / perguntas.length
									}`
							  )
							: message.reply(
									`Laninha foi por pouco! Lana: ${laninhaPontos}, Julia: ${julinhaPontos}, Porcentagem: ${
										laninhaPontos / perguntas.length
									}`
							  );
						const user = await Users.findOne({
							where: { user_id: message.author.id },
						});
						await user.lanaWinner()
					} else {
						julinhaPontos / perguntas.length < 0.6
							? message.reply(
									`Julinha are the champion! Lana: ${laninhaPontos}, Julia: ${julinhaPontos}, Porcentagem: ${
										julinhaPontos / perguntas.length
									}`
							  )
							: message.reply(
									`Julinha foi por pouco! Lana: ${laninhaPontos}, Julia: ${julinhaPontos}, Porcentagem: ${
										julinhaPontos / perguntas.length
									}`
							  );
						const user = await Users.findOne({
							where: { user_id: message.author.id },
						});
						await user.increment('quizJulia');
					}
				}
			});
		});
	},
};
