import { useState } from "react";
import { User, Phone, Mail, Calendar } from "lucide-react";
import { useEffect } from "react";
import api from "../../../api/axios";

const AdminProfile = () => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserProfile = async () => {
    try {
      const { data, status } = await api.get("/users/profile");
      if (status === 200) {
        console.log("User profile data:", data);
        setUserInfo({
          name: `${data?.data?.firstName} ${data?.data?.lastName}`,
          email: data?.data?.email,
          phone: data?.data?.phone,
          profileImage: data?.data?.profileImage || null,
          joinedDate: new Date(data?.data?.createdAt).toLocaleDateString(),
        });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      alert("Failed to fetch user profile. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
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
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Full Name
                </label>

                <p className="text-amber-900 py-2 font-medium">
                  {userInfo.name}
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Email Address
                </label>
                <p className="text-amber-900 py-2 flex items-center gap-2">
                  <Mail size={16} className="text-amber-600" />
                  {userInfo.email}
                </p>
              </div>

              <div className="md:col-span-2"></div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-700 flex items-center gap-2">
                <Calendar size={16} />
                Member since {userInfo.joinedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
