import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { nr_cpf, senha } = req.body;

        const user = await User.findOne({ where: { nr_cpf } });

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        if (!(await user.checkPassword(senha))) {
            return res.status(401).json({ error: 'Password does not match.' });
        }

        const { id, nm_usuario, ds_email } = user;

        return res.json({
            user: {
                id,
                nm_usuario,
                ds_email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
