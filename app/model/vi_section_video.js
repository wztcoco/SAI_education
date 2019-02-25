/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_section_video', {
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    section_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    section_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    section_order: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    tableName: 'vi_section_video',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
