/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_live', {
    live_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    live_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    teacher_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    live_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    live_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    live_push: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    live_pull: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    watch_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    live_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'sai_live',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
