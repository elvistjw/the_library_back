import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nm_usuario: Sequelize.STRING,
                nr_cpf: Sequelize.INTEGER,
                ds_email: Sequelize.STRING,
                dt_nascimento: Sequelize.DATE,
                nr_telefone: Sequelize.INTEGER,
                senha: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
}

export default User;
