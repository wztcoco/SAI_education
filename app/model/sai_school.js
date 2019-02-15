/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_school', {
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    school_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    school_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sai_school',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
