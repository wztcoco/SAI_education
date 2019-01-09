/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_course', {
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    course_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    classroom_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_book: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sai_course'
  });

  Model.associate = function() {

  }

  return Model;
};
