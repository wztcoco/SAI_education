/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sai_announce', {
    announce_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    announce_type_id: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    delete_status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    admin_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    announce_to: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    announce_content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    announce_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'sai_announce',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
