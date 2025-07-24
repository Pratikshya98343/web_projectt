import User from '../../models/profile/Profile.js';
import path from 'path';
import { promises as fs } from 'fs';
import { Op } from 'sequelize';

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } 
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Check if email already exists (excluding current user)
    const existingUser = await User.findOne({
      where: {
        email: email,
        id: { [Op.ne]: userId }
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Update user
    const [updatedRows] = await User.update(
      { name, email, phone },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Fetch updated user
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Upload profile image
const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Update user with image path
    const imagePath = `/uploads/${req.file.filename}`;
    const [updatedRows] = await User.update(
      { profileImage: imagePath },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile image uploaded successfully',
      data: { profileImage: imagePath }
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const ProfileController = {
  getProfile,
  updateProfile,
  uploadProfileImage
};