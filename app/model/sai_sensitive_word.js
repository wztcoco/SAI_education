/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_sensitive_word', {
    word_id: {
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
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    word_content: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sai_sensitive_word',
    freezeTableName: true,
        timestamps: false,
        underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
