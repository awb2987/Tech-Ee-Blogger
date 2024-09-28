// models/Post.js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Post extends Model {}

// Define Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Refers to user model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Adds createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
