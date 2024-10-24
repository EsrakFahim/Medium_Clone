"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

const LoginPage = () => {
      const [step, setStep] = useState(1);
      const [loading, setLoading] = useState(false);
      const [redirectPath, setRedirectPath] = useState("/profile"); // Default path
      const router = useRouter();

      // Initialize react-hook-form
      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm();

      // Extract query params using URLSearchParams on the client side
      useEffect(() => {
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get("redirect");
            if (redirect) setRedirectPath(redirect);
      }, []);

      // Handle step 1: Email submission
      const handleNextStep = (data) => {
            console.log("Email submitted:", data.email);
            setStep(2);
      };

      // Handle final login submission
      const handleLogin = async (data) => {
            const { email, password } = data;
            setLoading(true);

            try {
                  const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_LOCAL}/api/v1/user/login`,
                        { email, password },
                        { withCredentials: true }
                  );

                  setLoading(false);
                  if (response.status === 200) {
                        console.log("Login success:", response.data);
                        alert(response.data.message);
                        router.replace(redirectPath);
                  } else {
                        alert(response.data.message);
                  }
            } catch (error) {
                  setLoading(false);
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
            <div className="flex items-center justify-center h-screen ">
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
