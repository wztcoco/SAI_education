/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_attendance', {
    attendance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    attendance_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attendance_longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    attendance_latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'sai_attendance',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
