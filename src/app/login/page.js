"use client"; // Make sure this is a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
const axios = require("axios");

const LoginPage = () => {
      const [step, setStep] = useState(1);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const router = useRouter();

      const handleNextStep = (e) => {
            e.preventDefault();
            if (email) setStep(2);
      };

      const handleLogin = async (e) => {
            e.preventDefault();

            try {
                  const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_LOCAL}/api/v1/user/login`,
                        { email, password },
                        { withCredentials: true } // Include cookies from the server
                  );

                  if (response.status === 200) {
                        const data = response.data;
                        console.log("Login success:", data);
                        alert(data.message); // Optional: Display success message

                        const { user, accessToken } = data.data;

                        console.log("User:", user);

                        // Use the accessToken for authorization in client routes if needed
                        if (user.role === "admin") {
                              // router.push("/admin"); // Redirect admin users
                        } else {
                              router.push("/profile"); // Redirect normal users
                        }
                  } else {
                        const errorData = response.data;
                        alert(errorData.message); // Handle login failure
                  }
            } catch (error) {
                  console.error("Login failed:", error);
                  alert("Something went wrong. Please try again.");
            }
      };

      return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                  <form
                        className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
                        onSubmit={step === 1 ? handleNextStep : handleLogin}
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
                                          className="w-full p-3 border rounded-lg"
                                          placeholder="Enter your email"
                                          value={email}
                                          onChange={(e) =>
                                                setEmail(e.target.value)
                                          }
                                          required
                                    />
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
                                          className="w-full p-3 border rounded-lg"
                                          placeholder="Enter your password"
                                          value={password}
                                          onChange={(e) =>
                                                setPassword(e.target.value)
                                          }
                                          required
                                    />
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
