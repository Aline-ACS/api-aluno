import Grade from '../models/Grade';
import Test from '../models/Test';
import User from '../models/User';

class GradeController {
  async index(req, res) {
    try {
      let grades;
      const { userType, userUid } = req;

      if (userType === 2) {
        grades = await Grade.findAll({
          attributes: ['uid', 'description', 'grade'],
          include: [
            {
              model: Test,
              as: 'test',
              attributes: ['uid', 'subject', 'description'],
              include: [
                {
                  model: User,
                  as: 'usernote',
                  attributes: ['uid', 'name', 'email', 'type'],
                },
              ],
            },
          ],
        });
      }

      if (userType === 1) {
        grades = await Grade.findAll({
          where: { user_uid: userUid },
          attributes: ['uid', 'description', 'grade'],
          include: [
            {
              model: Test,
              as: 'test',
              attributes: ['uid', 'subject', 'description'],
              include: [
                {
                  model: User,
                  as: 'usernote',
                  attributes: ['uid', 'name', 'email', 'type'],
                },
              ],
            },
          ],
        });
      }

      return res.json({ grades });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const grade = await Grade.findByPk(uid, {
        attributes: ['uid', 'description', 'grade'],
        include: [
          {
            model: Test,
            as: 'test',
            attributes: ['uid', 'subject', 'description'],
            include: [
              {
                model: User,
                as: 'usernote',
                attributes: ['uid', 'name', 'email'],
              },
            ],
          },
        ],
      });
      return res.json({ grade });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const grade = await Grade.create(req.body);
      return res.json({ grade });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Grade.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('nota não encontrada');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await Grade.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('erro ao atualizar dados');
      }

      return res.json({ result: 'dados atualizados com sucesso' });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new GradeController();
