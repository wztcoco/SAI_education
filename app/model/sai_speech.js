/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_speech', {
    speech_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    speech_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    speech_content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    speech_place: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'sai_speech',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
