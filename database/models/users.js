module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		quizLana: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
        quizJulia: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        quizUltimo: {
            type: DataTypes.STRING,
            defaultValue: "Sem Histórico",
            allowNull: false
        }
	}, {
		timestamps: false,
	});
};
