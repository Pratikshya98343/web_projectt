import React, { useState, useEffect } from "react";
import { useSelector} from 'react-redux';
 
 
import {
  User,
  Edit,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  X,
} from "lucide-react";
import api from "../../../api/axios";
 
const AccountProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    FullName: "",
    Email_Address: "",
    Phone_Number: "",
    Delivery_Message: "",
    joinDate: "",
    profileImage: null,
  });
 
  const [originalInfo, setOriginalInfo] = useState({ ...userInfo });
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchProfile();
  }, []);
 
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        console.error("No authentication token found");
        setLoading(false);
        return;
      }
 
      const response = await fetch("/api/accountprofile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
 
      if (response.ok) {
        const result = await response.json();
        const userData = result.data || result.user;
 
        const formattedData = {
          name:
            userData.firstName || userData.name
              ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
              : "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          joinDate: userData.createdAt
            ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : "",
          profileImage: userData.profileImage
            ? `/uploads/${userData.profileImage}`
            : null,
        };
 
        setUserInfo(formattedData);
        setOriginalInfo(formattedData);
      } else {
        console.error("Failed to fetch profile:", response.status);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
 
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
 
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/accountprofile/upload-image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
 
        if (response.ok) {
          const result = await response.json();
          // Update profile image in state
          setUserInfo((prev) => ({
            ...prev,
            profileImage: result.data.profileImage
              ? `/uploads/${result.data.profileImage}`
              : prev.profileImage,
          }));
          alert("Profile image uploaded successfully!");
        } else {
          const errorData = await response.json();
          alert(
            `Failed to upload image: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      }
    }
  };
 
  const handleEdit = () => {
    setOriginalInfo({ ...userInfo });
    setIsEditing(true);
  };
 
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.post(
        "/accountprofile",
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from save:", response);
 
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        setOriginalInfo({ ...userInfo });
      } else {
        alert(
          `Failed to update profile: ${response.statusText || "Unknown error"}` 
        );
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    }
  };
 
  const handleCancel = () => {
    setUserInfo({ ...originalInfo });
    setIsEditing(false);
  };
 
  if (loading) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-amber-800">Loading profile...</div>
      </div>
    );
  }
 
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8 px-4">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">My Profile</h1>
          <p className="text-amber-700 mt-2">
            Manage your personal information and view your activity
          </p>
        </div>
 
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-amber-800">
              Profile Information
            </h2>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-black rounded-lg hover:bg-amber-700 transition-colors shadow-md"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-black rounded-lg hover:bg-red-700 transition-colors shadow-md"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
 
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-amber-300">
                  {userInfo.profileImage ? (
                    <img
                      src={userInfo.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-amber-600" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-amber-600 text-white p-2 rounded-full cursor-pointer hover:bg-amber-700 transition-colors shadow-lg">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
 
            {/* User Details */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.name}
                      name="name"
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 font-medium">
                      {userInfo.name || "Not provided"}
                    </p>
                  )}
                </div>
 
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={userInfo.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 flex items-center gap-2">
                      <Phone size={16} className="text-amber-600" />
                      {userInfo.phone || "Not provided"}
                    </p>
                  )}
                </div>
 
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 flex items-center gap-2">
                      <Mail size={16} className="text-amber-600" />
                      {userInfo.email || "Not provided"}
                    </p>
                  )}
                </div>
 
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Delivery Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={userInfo.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-20 resize-none"
                      placeholder="Enter your delivery address"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 flex items-start gap-2">
                      <MapPin size={16} className="text-amber-600 mt-1" />
                      {userInfo.address || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
 
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700 flex items-center gap-2">
                  <Calendar size={16} />
                  Member since {userInfo.joinDate || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AccountProfile;
 
 