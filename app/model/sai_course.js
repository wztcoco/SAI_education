/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_course', {
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    course_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_start_section: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    course_end_section: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    classroom_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_book: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    course_class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_start_week: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_end_week: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_learn_year: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_time_day: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_semester: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    evalution_start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    evalution_end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    course_start_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    course_end_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    course_credit: {
      type: "DOUBLE(3,1)",
      allowNull: true
    },
    specialty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_learn_grade: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'sai_course',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
