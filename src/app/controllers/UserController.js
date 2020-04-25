import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { nr_cpf: req.body.nr_cpf },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const {
            id,
            nm_usuario,
            ds_email,
            nr_cpf,
            dt_nascimento,
            nr_telefone,
        } = await User.create(req.body);

        return res.json({
            id,
            nm_usuario,
            ds_email,
            nr_cpf,
            dt_nascimento,
            nr_telefone,
        });
    }

    async update(req, res) {
        const { nr_cpf, senha_antiga } = req.body;

        const user = await User.findByPk(req.userId);

        if (nr_cpf !== user.nr_cpf) {
            const userExists = await User.findOne({
                where: { nr_cpf },
            });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }

        if (senha_antiga && !(await user.checkPassword(senha_antiga))) {
            return res.status(401).json({ error: 'Password does not match.' });
        }

        const {
            id,
            nm_usuario,
            ds_email,
            dt_nascimento,
            nr_telefone,
        } = await user.update(req.body);

        return res.json({
            id,
            nm_usuario,
            ds_email,
            dt_nascimento,
            nr_telefone,
        });
    }
}

export default new UserController();
