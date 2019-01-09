/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_admin', {
    admin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    admin_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    admin_pwd: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    admin_rank: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'sai_admin'
  });

  Model.associate = function() {

  }

  return Model;
};
