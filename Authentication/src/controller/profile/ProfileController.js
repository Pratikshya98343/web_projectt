import { User } from "../../models/index.js";
import fs from "fs";
import path from "path";

class ProfileController {
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not authenticated" });
      }

      const { name, email, phone, address } = req.body;

      // Split name into firstName and lastName
      let firstName = "";
      let lastName = "";

      console.log("Updating profile with data:", req.body);
      if (name && typeof name === "string") {
        const trimmedName = name.trim();
        if (trimmedName.includes(" ")) {
          const parts = trimmedName.split(" ");
          firstName = parts.shift();
          lastName = parts.join(" ");
        } else {
          firstName = trimmedName;
        }
      }

      // Update user profile
      const [updatedRows] = await User.update(
        {
          firstName,
          lastName,
          email,
          phone,
          address,
        },
        { where: { id: userId } }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Fetch updated user to return
      const updatedUser = await User.findByPk(userId);

      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      res
        .status(500)
        .json({ error: "Failed to update profile", details: error.message });
    }
  }

  static async uploadProfileImage(req, res) {
    try {
      const userId = req.user.id;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        // Delete uploaded file if user not found
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({ message: "User not found" });
      }

      // Delete old profile image file if exists
      if (user.profileImage) {
        const oldImagePath = path.join(
          process.cwd(),
          "uploads",
          user.profileImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update user with new profile image
      user.profileImage = req.file.filename;
      await user.save();

      res.status(200).json({
        message: "Profile image uploaded successfully",
        data: user,
      });
    } catch (error) {
      console.error("Failed to upload profile image:", error);
      // Clean up uploaded file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: "Failed to upload profile image" });
    }
  }
}

export { ProfileController };
