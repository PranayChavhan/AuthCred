import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import {  EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!isChecked) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      
      // Store user info (optional)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Handle successful signup
      console.log('Signup successful', response.data);
      navigate("/", { replace: true }); // Redirect to home
    } catch (err) {
      // Handle signup error
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Signup failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/");
      }
    }, [navigate]);
  

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          
          {/* OAuth Buttons - Kept as in original component */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
              {/* Google SVG Icon */}
              Sign up with Google
            </button>
            <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
              {/* X SVG Icon */}
              Sign up with X
            </button>
          </div>

          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                Or
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-error-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div className="sm:col-span-1">
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    
                  />
                </div>
                {/* Last Name */}
                <div className="sm:col-span-1">
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  
                />
              </div>
              {/* Password */}
              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account means you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions,
                  </span>{" "}
                  and our{" "}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div>
              {/* Submit Button */}
              <div>
                <button 
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account? {""}
              <Link
                to="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
