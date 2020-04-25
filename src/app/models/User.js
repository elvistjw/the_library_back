import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nm_usuario: Sequelize.STRING,
                nr_cpf: Sequelize.STRING,
                ds_email: Sequelize.STRING,
                senha: Sequelize.VIRTUAL,
                senha_hash: Sequelize.STRING,
                dt_nascimento: Sequelize.DATE,
                nr_telefone: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.senha) {
                user.senha_hash = await bcrypt.hash(user.senha, 8);
            }
        });

        return this;
    }

    checkPassword(senha) {
        return bcrypt.compare(senha, this.senha_hash);
    }
}

export default User;
