module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'TheLibrary',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
