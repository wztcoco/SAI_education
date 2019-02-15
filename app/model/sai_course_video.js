/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_course_video', {
    video_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    teacher_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    video_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    play_times: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    video_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'sai_course_video',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
