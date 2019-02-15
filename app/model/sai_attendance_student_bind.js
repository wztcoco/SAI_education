/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_attendance_student_bind', {
    bind_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    attendance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    attendance_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'sai_attendance_student_bind',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
