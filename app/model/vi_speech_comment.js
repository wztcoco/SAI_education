/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_speech_comment', {
    comment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    speech_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id_replay: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    comment_content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_name_replay: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'vi_speech_comment',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
