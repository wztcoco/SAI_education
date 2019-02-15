/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_student_course', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    course_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    course_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    teacher_user_id: {
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
    classroom_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    classroom_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    classroom_area: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    classroom_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    real_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    teacher_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    teacher_number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'vi_student_course',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
