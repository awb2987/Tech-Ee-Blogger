// models/User.js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  // Method to check if the password is valid
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures usernames are unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true, // Adds createdAt and updatedAt fields
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Hook to hash password before saving to database
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
