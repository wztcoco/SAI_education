/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_course_plan', {
    plan_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    plan_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    plan_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    plan_content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'sai_course_plan'
  });

  Model.associate = function() {

  }

  return Model;
};
