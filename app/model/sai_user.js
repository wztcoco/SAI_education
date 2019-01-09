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
      allowNull: false
    },
    open_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    real_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    telephone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    user_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    online_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
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
