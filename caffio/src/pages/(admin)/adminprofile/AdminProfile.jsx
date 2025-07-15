import React, { useState } from 'react';
import { User, Edit, Camera, Phone, Mail, MapPin, ShoppingBag, Heart, Calendar, Star, Save, X } from 'lucide-react';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Pratikshya Shrestha',
    email: 'Pratikshyashrestha94.com',
    phone: '9876543210',
    address: 'Kirtipur, Kathmandu, Nepal',
    joinDate: 'January 2024',
    profileImage: null,
  });

  const [originalInfo, setOriginalInfo] = useState({ ...userInfo });

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setOriginalInfo({ ...userInfo });
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setOriginalInfo({ ...userInfo });
    console.log('Saving user info:', userInfo);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setUserInfo({ ...originalInfo });
    setIsEditing(false);
  };

  return (
   <div className="w-screen h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-50 px-4">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">My Profile</h1>
          <p className="text-amber-700 mt-2">Manage your personal information and view your activity</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-amber-800">Profile Information</h2>
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
                    <img src={userInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
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
                  <label className="block text-sm font-medium text-amber-800 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 font-medium">{userInfo.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 flex items-center gap-2">
                      <Phone size={16} className="text-amber-600" />
                      {userInfo.phone}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-800 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 flex items-center gap-2">
                      <Mail size={16} className="text-amber-600" />
                      {userInfo.email}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-amber-800 mb-2">Delivery Address</label>
                  {isEditing ? (
                    <textarea
                      value={userInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-20 resize-none"
                      placeholder="Enter your delivery address"
                    />
                  ) : (
                    <p className="text-amber-900 py-2 flex items-start gap-2">
                      <MapPin size={16} className="text-amber-600 mt-1" />
                      {userInfo.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700 flex items-center gap-2">
                  <Calendar size={16} />
                  Member since {userInfo.joinDate}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;