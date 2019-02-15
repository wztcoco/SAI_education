/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_back_class', {
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
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
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    real_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    student_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    teacher_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'vi_back_class',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
