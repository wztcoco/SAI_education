/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_column', {
    column_id: {
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
    column_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    column_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    column_rank: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    column_parent_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'sai_column'
  });

  Model.associate = function() {

  }

  return Model;
};
