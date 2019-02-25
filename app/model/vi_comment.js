/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vi_comment', {
    nick_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    video_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    comment_content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    comment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'vi_comment',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  Model.associate = function() {

  }

  return Model;
};
