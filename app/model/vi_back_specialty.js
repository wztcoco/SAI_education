/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_back_specialty', {
    specialty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    specialty_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    specialty_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    specialty_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    specialty_principal: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    real_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    class_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'vi_back_specialty',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
