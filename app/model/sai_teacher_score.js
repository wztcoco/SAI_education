/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_teacher_score', {
    score_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    teacher_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    evaluation_score: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'sai_teacher_score',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
