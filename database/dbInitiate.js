const Sequelize = require('sequelize');

const sequelizeGemeas = new Sequelize(
	"database",
	process.env.USERNAME,
	process.env.PASSWORD,
	{
		host: "localhost",
		dialect: "sqlite",
		logging: false,
		// SQLite only
		storage: "./GemeasDB.sqlite",
	}
);

require('./models/Users')(sequelizeGemeas, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelizeGemeas.sync({ force }).then(async () => {
	console.log('Database synced');
	sequelizeGemeas.close();
}).catch(console.error);