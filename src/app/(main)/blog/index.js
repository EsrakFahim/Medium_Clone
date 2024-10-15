"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import BlogCard from "../../../Components/BlogCard/BlogCard.js";

const HomePage = () => {
      const [blogs, setBlogs] = useState([]);
      const [loading, setLoading] = useState(true); // Track loading state

      const handleBlogFetch = async () => {
            try {
                  const res = await axios.get(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_LOCAL}/api/v1/blog/`
                  );

                  if (res.data && res.data.data) {
                        setBlogs(res.data.data);
                  } else {
                        toast.error("Failed to fetch blogs");
                  }
            } catch (error) {
                  console.error("Error:", error);
                  toast.error("An error occurred while fetching blogs");
            } finally {
                  setLoading(false); // Set loading to false after fetch
            }
      };

      useEffect(() => {
            handleBlogFetch();
      }, []);

      if (!blogs) {
            return (
                  <div className="flex items-center justify-center h-screen">
                        <p className="text-lg">No blogs found</p>
                  </div>
            );
      }

      return (
            <div>
                  <div className="flex items-start gap-5">
                        <div className="w-full lg:w-[70%] flex flex-col gap-10">
                              {loading
                                    ? // Display Skeletons while loading
                                    Array.from({ length: 5 }).map(
                                          (_, index) => (
                                                <div
                                                      key={index}
                                                      className="flex items-center justify-between border-b border-b-neutral-300 py-10 px-10"
                                                >
                                                      <div className="flex flex-col gap-6 w-full px-5">
                                                            <div className="flex-1">
                                                                  <Skeleton
                                                                        height={
                                                                              30
                                                                        }
                                                                        width={`80%`}
                                                                  />
                                                                  <Skeleton
                                                                        count={
                                                                              2
                                                                        }
                                                                  />
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                  <div className="flex items-center gap-5">
                                                                        <Skeleton
                                                                              width={
                                                                                    50
                                                                              }
                                                                        />
                                                                        <Skeleton
                                                                              width={
                                                                                    50
                                                                              }
                                                                        />
                                                                        <Skeleton
                                                                              width={
                                                                                    50
                                                                              }
                                                                        />
                                                                  </div>
                                                                  <div className="flex items-center gap-5 text-2xl">
                                                                        <Skeleton
                                                                              circle
                                                                              height={
                                                                                    30
                                                                              }
                                                                              width={
                                                                                    30
                                                                              }
                                                                        />
                                                                        <Skeleton
                                                                              circle
                                                                              height={
                                                                                    30
                                                                              }
                                                                              width={
                                                                                    30
                                                                              }
                                                                        />
                                                                        <Skeleton
                                                                              circle
                                                                              height={
                                                                                    30
                                                                              }
                                                                              width={
                                                                                    30
                                                                              }
                                                                        />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <Skeleton
                                                                  height={200}
                                                                  width={200}
                                                            />
                                                      </div>
                                                </div>
                                          )
                                    )
                                    : blogs.map((blog) => (
                                          <BlogCard key={blog._id} blog={blog} />
                                    ))}
                        </div>
                        <div className="hidden lg:block lg:w-[30%] sticky top-0">
                                    
                        </div>
                  </div>
            </div>
      );
};

export default HomePage;
