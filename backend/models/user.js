'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email must be unique!" }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    underscored: false // create snake_case columns
  });
  return User;
};