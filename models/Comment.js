const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Refers to user model
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post', // Refers to post model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Adds the createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
