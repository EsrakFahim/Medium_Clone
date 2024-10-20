"use client"; // Ensure this is a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Direct import of axios

const LoginPage = () => {
      const [step, setStep] = useState(1);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const router = useRouter();

      // Handle Next Step (Email submission)
      const handleNextStep = (e) => {
            e.preventDefault();
            if (email) setStep(2);
      };

      // Handle Login (Password submission)
      const handleLogin = async (e) => {
            e.preventDefault();
            try {
                  const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_LOCAL}/api/v1/user/login`,
                        { email, password },
                        { withCredentials: true } // Ensure cookies are sent and saved
                  );

                  if (response.status === 200) {
                        const data = response.data;
                        console.log("Login success:", data);
                        alert(data.message); // Show success message

                        const { user } = data.data;

                        // Route based on user role
                        if (user.role === "admin") {
                              router.push("/admin"); // Redirect admin users
                        } else {
                              router.push("/dashboard"); // Redirect normal users
                        }
                  } else {
                        alert(response.data.message); // Handle non-200 responses
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
