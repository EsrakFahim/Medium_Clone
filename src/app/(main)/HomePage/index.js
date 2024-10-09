"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiCircleMinus, CiBookmarkPlus } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

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
                  <div className="w-full xl:max-w-[70%] mx-auto flex items-start gap-5">
                        <div className="w-full lg:w-[70%] flex  flex-col gap-10">
                              {/* Display the fetched blogs here */}
                              {blogs.length > 0 ? (
                                    blogs.map((blog) => (
                                          <div
                                                key={blog.id}
                                                className="flex items-center justify-between border-b border-b-neutral-300 py-10 px-10"
                                          >
                                                <div className="flex flex-col gap-6 w-full px-5">
                                                      <div className="flex-1">
                                                            <div></div>
                                                            <div>
                                                                  <h2 className="text-2xl font-bold">
                                                                        {
                                                                              blog.title
                                                                        }
                                                                  </h2>
                                                                  <p>
                                                                        {
                                                                              blog.subtitle
                                                                        }
                                                                  </p>
                                                            </div>
                                                      </div>
                                                      <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-5">
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
                                                                  <span className="flex items-center gap-2">
                                                                        <SlLike />
                                                                        <span>
                                                                              22
                                                                        </span>
                                                                  </span>
                                                                  <span className="flex items-center gap-2">
                                                                        <FaRegCommentAlt />
                                                                        <span>
                                                                              22
                                                                        </span>
                                                                  </span>
                                                            </div>
                                                            <div className="flex items-center gap-5 text-2xl">
                                                                  <span className="flex items-center gap-2">
                                                                        <CiCircleMinus />
                                                                  </span>
                                                                  <span className="flex items-center gap-2">
                                                                        <CiBookmarkPlus />
                                                                  </span>
                                                                  <span className="flex items-center gap-2">
                                                                        <BsThreeDots />
                                                                  </span>
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
                        <div className="hidden lg:block lg:w-[30%] h-[500px] bg-blue-600"></div>
                  </div>
            </div>
      );
};

export default HomePage;
