/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_grade', {
    grade_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    grade_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    grade_point: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    course_credit: {
      type: "DOUBLE(3,1)",
      allowNull: true
    },
    course_semester: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_learn_grade: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_learn_year: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'vi_grade',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
