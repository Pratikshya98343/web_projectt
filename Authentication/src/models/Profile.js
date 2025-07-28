import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Profile = sequelize.define('ContactMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email_Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Phone_Number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Delivery_Message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'profiles',
  timestamps: true,
});

export default Profile;
