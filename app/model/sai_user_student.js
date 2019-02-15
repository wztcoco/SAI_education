/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_user_student', {
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    student_number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    real_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    student_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    student_birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    online_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    student_static: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    admission_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    id_card_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sai_user_student',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
