/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_student_video_time', {
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    learn_time: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'vi_student_video_time',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
