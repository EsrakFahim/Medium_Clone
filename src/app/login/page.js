"use client"; // Ensure this is a client component

import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
      const [step, setStep] = useState(1);
      const [loading, setLoading] = useState(false);
      const router = useRouter();
      const searchParams = useSearchParams();
      const redirectPath = searchParams.get("redirect") || "/profile"; // Default to profile if no redirect path

      // Initialize react-hook-form for both steps
      const {
            register,
            handleSubmit,
            formState: { errors },
            getValues,
      } = useForm();

      // Step 1: Handle email submission and move to the password step
      const handleNextStep = (data) => {
            console.log("Email submitted:", data.email);
            setStep(2); // Move to the next step
      };

      // Step 2: Handle final login submission
      const handleLogin = async (data) => {
            const { email, password } = data; // Get email and password from form data
            setLoading(true); // Show loading spinner
            try {
                  const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_LOCAL}/api/v1/user/login`,
                        { email, password },
                        { withCredentials: true } // Include cookies from the server
                  );

                  if (response.status === 200) {
                        setLoading(false); // Hide loading spinner
                        console.log("Login success:", response.data);
                        alert(response.data.message); // Optional: Success message

                        // Redirect to the intended route after login
                        router.replace(redirectPath);
                  } else {
                        alert(response.data.message); // Handle login failure
                  }
            } catch (error) {
                  console.error("Login failed:", error);
                  alert("Something went wrong. Please try again.");
            }
      };

      if (loading) {
            return (
                  <div className="flex items-center justify-center h-screen bg-gray-100">
                        <div className="p-8 bg-white shadow-lg rounded-lg">
                              <h2 className="text-2xl font-semibold text-center mb-6">
                                    Logging in...
                              </h2>
                              <div className="flex justify-center">
                                    <div className="w-8 h-8 border-2 border-t-2 border-gray-900 rounded-full animate-spin"></div>
                              </div>
                        </div>
                  </div>
            );
      }

      return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                  <form
                        className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
                        onSubmit={
                              step === 1
                                    ? handleSubmit(handleNextStep)
                                    : handleSubmit(handleLogin)
                        }
                  >
                        <h2 className="text-2xl font-semibold text-center mb-6">
                              {step === 1 ? "Login: Step 1" : "Login: Step 2"}
                        </h2>

                        {step === 1 ? (
                              <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Email
                                    </label>
                                    <input
                                          type="email"
                                          className={`w-full p-3 border rounded-lg ${
                                                errors.email
                                                      ? "border-red-500"
                                                      : ""
                                          }`}
                                          placeholder="Enter your email"
                                          {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                      message: "Invalid email address",
                                                },
                                          })}
                                    />
                                    {errors.email && (
                                          <p className="text-red-500 text-sm mt-1">
                                                {errors.email.message}
                                          </p>
                                    )}
                                    <button
                                          type="submit"
                                          className="w-full bg-blue-500 text-white mt-4 p-2 rounded-lg hover:bg-blue-600"
                                    >
                                          Continue
                                    </button>
                              </div>
                        ) : (
                              <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Password
                                    </label>
                                    <input
                                          type="password"
                                          className={`w-full p-3 border rounded-lg ${
                                                errors.password
                                                      ? "border-red-500"
                                                      : ""
                                          }`}
                                          placeholder="Enter your password"
                                          {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                      value: 6,
                                                      message: "Password must be at least 6 characters long",
                                                },
                                          })}
                                    />
                                    {errors.password && (
                                          <p className="text-red-500 text-sm mt-1">
                                                {errors.password.message}
                                          </p>
                                    )}
                                    <button
                                          type="submit"
                                          className="w-full bg-green-500 text-white mt-4 p-2 rounded-lg hover:bg-green-600"
                                    >
                                          Login
                                    </button>
                              </div>
                        )}
                  </form>
            </div>
      );
};

export default LoginPage;
