/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_back_student_detail', {
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
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
    admission_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    online_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    student_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    student_birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    student_static: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    nick_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    open_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    class_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    specialty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    head_teacher: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    specialty_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    specialty_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    specialty_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    specialty_principal: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    school_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'vi_back_student_detail',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
