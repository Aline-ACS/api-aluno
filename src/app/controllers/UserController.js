import User from '../models/User';
import Test from '../models/Test';
import Grade from '../models/Grade';

class UserController {
  async index(req, res) {
    try {
      const usersByType = await User.findAll({ where: { type } });

      if (usersByType === 2) {
        const users = await User.findAll();
        return res.json({ users });
      }

      if (usersByType !== 2) {
        throw Error('acesso não permitido');
      }

      const users = await User.findAll();
      return res.json({ users });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const { email } = req.body;

      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        throw Error('usuário já cadastrado');
      }

      const user = await User.create(req.body);
      return res.json({ user });
    } catch (error) {
      return res.json({ error: 'usuário já cadastrado' });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findByPk(uid, {
        attributes: ['name', 'email', 'type'],
        include: [
          {
            model: Test,
            as: 'test_user',
            attributes: ['subject', 'description'],
            include: [
              {
                model: Grade,
                as: 'grade',
                attributes: ['uid', 'grade'],
              },
            ],
          },
        ],
      });

      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        return res.json({ error: 'Usuário não encontrado' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Senha Inválida' });
      }

      const { name } = await user.update(req.body);
      return res.json({ user: { uid, name, email } });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new UserController();
