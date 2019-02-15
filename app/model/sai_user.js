/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_user', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nick_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    open_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sai_user',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
