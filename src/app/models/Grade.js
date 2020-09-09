import Sequelize, { Model } from 'sequelize';

class Grade extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        user_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        test_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'tests',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        grade: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Test, {
      as: 'test',
      foreignKey: 'test_uid',
    });
  }
}

export default Grade;
