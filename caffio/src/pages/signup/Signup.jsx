import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = await api.post("/auth/signup", userData);

      if (response.status !== 201) {
        console.error("Signup failed with status:", response?.data?.message);
        return;
      }

      reset();
      navigate("/signin");
    } catch (error) {
      console.error(
        "Signup failed:",
        error?.response?.data?.message || "An unexpected error occurred."
      );
      console.log(
        `Failed to create account: ${error.message || "Please try again."}`
      );
    }
  };

  const password = watch("password");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#F5E6D3] via-[#DCC7B1] to-[#6F4E37] p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        {/* Header Section */}
        <div className="bg-[#6F4E37] px-9 py-5 text-center">
          <h1 className="text-2xl font-bold text-white mb-0">Create Account</h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={`w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] transition duration-200 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className={`w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] transition duration-200 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] transition duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-]+$/,
                    message:
                      "Password must contain an uppercase letter, a number, and a symbol.",
                  },
                })}
                className={`w-full text-black px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] transition duration-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] rounded-full p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full text-black px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-[#6F4E37] transition duration-200 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6F4E37] rounded-full p-1"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#6F4E37] to-[#5D3A2A] text-white py-3 px-4 rounded-xl font-medium hover:from-[#5D3A2A] hover:to-[#4B251C] focus:ring-2 focus:ring-[#6F4E37] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center p-6 pt-0 bg-gray-50 rounded-b-xl">
          <p className="text-base text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="font-semibold text-[#6F4E37] hover:text-[#5D3A2A] hover:underline transition-colors duration-200"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;