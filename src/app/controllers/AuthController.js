import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class AuthController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const { uid, name, type } = user;

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha Inválida' });
      }

      return res.json({
        user: {
          uid,
          name,
          email,
          type,
        },
        token: jwt.sign({ uid, type }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new AuthController();
