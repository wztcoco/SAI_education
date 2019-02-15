/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_course_resource', {
    resource_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resource_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resource_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resource_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    upload_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    download_times: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    resource_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sai_course_resource',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
