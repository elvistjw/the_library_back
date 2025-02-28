module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nm_usuario: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nr_cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            ds_email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            senha_hash: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dt_nascimento: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            nr_telefone: {
                type: Sequelize.STRING,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('users');
    },
};
