"use client"; // This is a client-side component

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiBookmarkPlus, CiShare2 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { ClipLoader } from "react-spinners"; // For loading spinner
import Image from "next/image";
import Link from "next/link";

const Page = ({ params }) => {
      const { id } = params;
      const [blog, setBlog] = useState({});
      const [loading, setLoading] = useState(true); // Set loading to true initially
      const [imageLoaded, setImageLoaded] = useState(false); // State for image load

      // Client-side data fetching
      const handleSingleBlogFetch = async () => {
            try {
                  const res = await axios.get(
                        `http://localhost:5050/api/v1/blog/${id}`
                  );
                  setBlog(res.data.data);
                  setLoading(false); // Disable loading when data is fetched
            } catch (error) {
                  setLoading(false);
                  toast.error("An error occurred while fetching the blog");
            }
      };

      // Fetch blog when the component is mounted
      useEffect(() => {
            if (id) {
                  handleSingleBlogFetch();
            }
      }, [id]);

      // Handle image loading to remove blur
      const handleImageLoad = () => {
            setImageLoaded(true); // Image has been loaded
      };

      if (loading) {
            return (
                  <div className="flex justify-center items-center h-screen">
                        <ClipLoader size={60} color="#4A90E2" />
                  </div>
            );
      }

      return (
            <div className="max-w-[70%] mx-auto blog-image">
                  {blog && (
                        <>
                              <div>
                                    <div>
                                          <h1>{blog.title}</h1>
                                    </div>
                                    <div>
                                          <div className="h-10">
                                                {/* Writer content */}
                                          </div>
                                          <div className="border-y border-neutral-300 py-6 px-3 my-4 flex items-center justify-between">
                                                <div className="text-xl flex items-center gap-5">
                                                      <span className="flex items-center gap-3">
                                                            <SlLike />
                                                            <span>22</span>
                                                      </span>
                                                      <span className="flex items-center gap-3">
                                                            <FaRegCommentAlt />
                                                            <span>22</span>
                                                      </span>
                                                </div>
                                                <div className="flex items-center gap-5 text-2xl">
                                                      <span className="flex items-center gap-2">
                                                            <CiBookmarkPlus />
                                                      </span>
                                                      <span className="flex items-center gap-2">
                                                            <CiShare2 />
                                                      </span>
                                                      <span className="flex items-center gap-2">
                                                            <BsThreeDots />
                                                      </span>
                                                </div>
                                          </div>
                                    </div>

                                    {/* Apply a class for the blog content */}
                                    <div
                                          className="blog-content my-10"
                                          dangerouslySetInnerHTML={{
                                                __html: blog?.content,
                                          }}
                                    />
                              </div>

                              <div>
                                    {/* need to add author some more blogs */}
                              </div>

                              {/* Tags part */}
                              <div className="border-y border-neutral-300 py-6 px-3 my-4 flex items-center gap-5 flex-wrap">
                                    {blog?.tags.map((tag, _index) => {
                                          console.log(tag);
                                          return (
                                                <Link
                                                      key={_index}
                                                      href={`/blog/tag/${tag}`}
                                                      className="text-primary-500 px-3 py-1 rounded-full border border-neutral-300 hover:bg-neutral-200"
                                                >
                                                      <span>{tag}</span>
                                                </Link>
                                          );
                                    })}
                              </div>

                              <div>{/* Recommended Blogs*/}</div>
                        </>
                  )}
            </div>
      );
};

export default Page;
