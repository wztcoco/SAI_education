/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_course_section', {
    section_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    section_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    video_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    section_order: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'sai_course_section',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
