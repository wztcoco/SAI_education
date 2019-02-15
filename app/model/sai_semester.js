/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_semester', {
    semester_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    semester: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    semester_start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    semester_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'sai_semester',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
