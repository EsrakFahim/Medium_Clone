"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HomePage = () => {
      const [blogs, setBlogs] = useState([]);

      const handleBlogFetch = async () => {
            try {
                  const res = await axios.get(
                        "http://localhost:5050/api/v1/blog/"
                  );
                  if (res.data && res.data.data) {
                        setBlogs(res.data.data);
                  } else {
                        toast.error("Failed to fetch blogs");
                  }
            } catch (error) {
                  toast.error("An error occurred while fetching blogs");
            }
      };

      // Fetch blogs only once when the component is mounted
      useEffect(() => {
            handleBlogFetch();
      }, []); // Empty dependency array ensures it only runs once after the component mounts

      return (
            <div>
                  <div className="max-w-[70%] mx-auto flex items-start gap-5">
                        <div className="w-[70%] h-[500px] flex flex-col gap-10">
                              {/* Display the fetched blogs here */}
                              {blogs.length > 0 ? (
                                    blogs.map((blog) => (
                                          <div
                                                key={blog.id}
                                                className="flex items-center justify-between"
                                          >
                                                <div>
                                                      <div></div>
                                                      <div>
                                                            <h2 className="text-2xl font-bold">
                                                                  {blog.title}
                                                            </h2>
                                                            <p>
                                                                  {
                                                                        blog.subtitle
                                                                  }
                                                            </p>
                                                      </div>
                                                      <div>
                                                            <div>
                                                                  <p>
                                                                        {new Date(
                                                                              blog?.createdAt
                                                                        ).toLocaleDateString(
                                                                              "en-GB",
                                                                              {
                                                                                    day: "numeric",
                                                                                    month: "short", // Abbreviated month (e.g., "Aug")
                                                                                    year: "numeric",
                                                                              }
                                                                        )}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div>
                                                      <Image
                                                            src={
                                                                  blog.blogCoverImage
                                                            }
                                                            alt={blog.title}
                                                            width={200}
                                                            height={200}
                                                            className="rounded-md w-32 aspect-square"
                                                      />
                                                </div>
                                          </div>
                                    ))
                              ) : (
                                    <p>No blogs found</p>
                              )}
                        </div>
                        <div className="w-[30%] h-[500px] bg-blue-600"></div>
                  </div>
            </div>
      );
};

export default HomePage;
