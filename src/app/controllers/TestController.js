import Test from '../models/Test';
import Grade from '../models/Grade';

class TestController {
  async index(req, res) {
    try {
      const tests = await Test.findAll({
        attributes: ['uid', 'subject', 'description'],
        include: [
          {
            model: Grade,
            as: 'grade',
            attributes: ['user_uid', 'test_uid', 'description', 'grade'],
          },
        ],
      });
      return res.json({ tests });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const test = await Test.findByPk(uid, {
        attributes: ['user_uid', 'test_uid', 'description', 'grade'],
        include: [
          {
            model: Grade,
            as: 'grade',
            attributes: ['user_uid', 'test_uid', 'description', 'grade'],
          },
        ],
      });
      return res.json({ test });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const test = await Test.create(req.body);
      return res.json({ test });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Test.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('prova não encontrada');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await Test.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('erro ao atualizar dados');
      }

      return res.json({ result: 'dados atualizados com sucesso' });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new TestController();
