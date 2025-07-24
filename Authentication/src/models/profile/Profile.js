// In src/models/profile/Profile.js
import { DataTypes } from 'sequelize';
import { sequelize } from "../../config/database.js";

const Profile = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: { 
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  joinDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default Profile;