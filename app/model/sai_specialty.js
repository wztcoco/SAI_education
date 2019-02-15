/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_specialty', {
    specialty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    specialty_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    specialty_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    specialty_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    specialty_principal: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'sai_specialty',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
