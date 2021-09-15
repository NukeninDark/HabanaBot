const {
    randomThigas
} = require('../chifres/thigas.js');
const {
    Thigas
} = require('../chifres/fotos.json');

module.exports = {
    name: 'randomizeavatar',
    aliases: [`rdma`],
    description: 'Eu irei aleatoriamente escolher uma foto de Thigas para usar!',
    globalcooldowns: true,
    execute(message, args) {
        const ID = randomThigas()
        return message.client.user.setAvatar(`./Fotos/thigas/${Thigas[ID].Nome}.${Thigas[ID].tipo}`).then(() => {
            message.reply(`Avatar atualizado com sucesso!`)
        });
    },
};
