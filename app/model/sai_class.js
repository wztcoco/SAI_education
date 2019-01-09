/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_class', {
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    class_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    specialty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    head_teacher: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'sai_class',
    freezeTableName: true,
        timestamps: false,
        underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
