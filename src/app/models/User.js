import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nm_usuario: Sequelize.STRING,
                nr_cpf: Sequelize.STRING,
                ds_email: Sequelize.STRING,
                senha: Sequelize.STRING,
                dt_nascimento: Sequelize.DATE,
                nr_telefone: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
}

export default User;
