"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiCircleMinus, CiBookmarkPlus } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

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
                                          <Link
                                                href={`/blog/${blog._id}`}
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
                                                                                    month: "short",
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
                                                            className="rounded-md w-56 aspect-square"
                                                      />
                                                </div>
                                          </Link>
                                    ))}
                        </div>
                        <div className="hidden lg:block lg:w-[30%] h-[500px] bg-blue-600"></div>
                  </div>
            </div>
      );
};

export default HomePage;
