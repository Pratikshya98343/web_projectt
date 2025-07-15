import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { rememberMe, ...userData } = data;

    try {
      const response = await api.post("/auth/login", userData);

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
        return;
      }

      console.error("Login failed with status:", response?.data?.message);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Invalid email or password";
      setError("password", { type: "manual", message });
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const PasswordToggleButton = () => (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
     
    >
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="h-5 w-5 text-gray-400 hover:text-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
        {showPassword && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3l18 18"
          />
        )}
      </svg>
    </button>
  );

  const PasswordField = () => (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LockIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password", passwordValidation)}
          className={`w-full text-black pl-10 pr-16 py-3 border rounded-xl focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent transition-all ${
            errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder="Enter your password"
        />
        <PasswordToggleButton />
      </div>
      {errors.password && (
        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
      )}
    </div>
  );

  const EnvelopeIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const LockIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#F5E6D3] via-[#DCC7B1] to-[#6F4E37] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb--8">
          <div className="w-16 h-14 bg-gradient-to-r from-[#6F4E37] to-[#5D3A2A] rounded-2xl mx-auto flex items-end justify-center pb-1">
            <LockIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#3E2723] mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#D2B48C]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full text-black pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent transition-all ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <PasswordField />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 text-[#6F4E37] border-gray-300 rounded focus:ring-[#6F4E37]"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#6F4E37] hover:text-[#5D3A2A] font-medium"
              >
                Forgot password?
              </button>
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
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <button
                onClick={handleSignUp}
                className="font-medium text-[#6F4E37] hover:text-[#5D3A2A]"
              >
                Sign up
              </button>
            </p>
            <button
              onClick={() => navigate("/admin/login")}
              className="mt-4 inline-block font-medium text-[#8B5E3C] hover:text-[#6F4E37]"
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
