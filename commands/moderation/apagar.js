module.exports = {
	name: 'apagar',
	description: 'Apaga de 1 a 99 mensagens no canal!',
	aliases: ['del'],
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Não foi inserido um número. Utilize de 1 a 99');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('Foi inserido um número inválido. Utilize de 1 a 99');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Teve um erro ao tentar apagar as mensagens neste canal!');
		});
	},
};
