import * as Yup from 'yup';

import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            nm_usuario: Yup.string().required(),
            ds_email: Yup.string().email().required(),
            nr_cpf: Yup.string().required(),
            dt_nascimento: Yup.string().required(),
            senha: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

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
        const schema = Yup.object().shape({
            nm_usuario: Yup.string(),
            ds_email: Yup.string().email(),
            nr_cpf: Yup.string(),
            dt_nascimento: Yup.string(),
            senha_antiga: Yup.string().min(6),
            senha: Yup.string()
                .min(6)
                .when('senha_antiga', (senha_antiga, field) =>
                    senha_antiga ? field.required() : field
                ),
            confirmPassword: Yup.string().when('senha', (senha, field) =>
                senha ? field.required().oneOf([Yup.ref('senha')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const { nr_cpf, senha_antiga } = req.body;

        const user = await User.findByPk(req.userId);

        if (nr_cpf !== user.nr_cpf) {
            // eslint-disable-next-line no-shadow
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
