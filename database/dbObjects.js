const Sequelize = require("sequelize");

const sequelizeGemeas = new Sequelize(
	"GemeasDB",
	process.env.USERNAME,
	process.env.PASSWORD,
	{
		host: "localhost",
		dialect: "sqlite",
		logging: false,
		// SQLite only
		storage: "./database/GemeasDB.sqlite",
	}
);

const Users = require("./models/Users")(sequelizeGemeas, Sequelize.DataTypes);

Users.prototype.addItem = async function(item) {
	const useritem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (useritem) {
		useritem.amount += 1;
		return useritem.save();
	}

	return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
};

Users.prototype.addWinner = async function(winner){
    const affectedRows = await Users.update({ quizUltimo: winner }, { where: { user_id: this.user_id } });
    if (affectedRows > 0) {
        return message.reply(`Foi adicionado **${winner}** como vencerdor.`);
    }
    return message.reply(`Nao foi possivel adicionar **${winner}** como vencedora.`);
}

Users.prototype.lanaWinner = async function(){
    const twinWinner = await Users.findOne( { where: { user_id: this.user_id } });

    if (twinWinner) {
        return twinWinner.increment('quizLana');
    }
    return message.reply('Não foi possivel adicionar o vencedor Lana no Database.')
}

Users.prototype.juliaWinner = async function(){
    const twinWinner = await Users.findOne( { where: { user_id: this.user_id } });

    if (twinWinner) {
        return twinWinner.increment('quizJulia');
    }
    return message.reply('Não foi possivel adicionar o vencedor Julia no Database.')
}

module.exports = { Users };