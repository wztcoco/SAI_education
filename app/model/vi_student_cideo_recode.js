/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_student_cideo_recode', {
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    video_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    learn_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    last_learn_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    course_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    section_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_class_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    section_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    course_class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'vi_student_cideo_recode',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
