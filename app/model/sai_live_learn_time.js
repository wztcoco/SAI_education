/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_live_learn_time', {
    bind_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    live_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    learn_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    last_learn_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'sai_live_learn_time',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
