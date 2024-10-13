"use client"; // This is a client-side component

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiBookmarkPlus, CiShare2 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import Image from "next/image";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton styles

const Page = ({ params }) => {
      const { id } = params;
      const [blog, setBlog] = useState({});
      const [loading, setLoading] = useState(true); // Set loading to true initially

      // Client-side data fetching
      const handleSingleBlogFetch = async () => {
            try {
                  const res = await axios.get(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_LOCAL}/api/v1/blog/${id}`
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

      return (
            <div className="max-w-[70%] mx-auto blog-image">
                  {loading ? (
                        // Display Skeletons while loading
                        <>
                              <Skeleton
                                    height={40}
                                    width={`80%`}
                                    className="mb-4"
                              />
                              <Skeleton height={500} className="mb-4" />
                              <Skeleton
                                    height={20}
                                    width={`60%`}
                                    className="mb-4"
                              />
                              <Skeleton
                                    height={20}
                                    width={`40%`}
                                    className="mb-2"
                              />
                              <Skeleton
                                    count={10}
                                    height={15}
                                    className="mb-2"
                              />
                              <Skeleton height={50} className="mb-4" />
                              <Skeleton
                                    height={30}
                                    width={`30%`}
                                    className="mb-2"
                              />
                        </>
                  ) : (
                        blog && (
                              <>
                                    <div>
                                          <h1 className="text-3xl font-bold mb-4">
                                                {blog.title}
                                          </h1>
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
                                          {/* Blog content */}
                                          <div
                                                className="blog-content my-10"
                                                dangerouslySetInnerHTML={{
                                                      __html: blog?.content,
                                                }}
                                          />
                                    </div>

                                    {/* Tags part */}
                                    <div className="border-y border-neutral-300 py-6 px-3 my-4 flex items-center gap-5 flex-wrap">
                                          {blog?.tags.map((tag, _index) => (
                                                <Link
                                                      key={_index}
                                                      href={`/blog/tag/${tag}`}
                                                      className="text-primary-500 px-3 py-1 rounded-full border border-neutral-300 hover:bg-neutral-200"
                                                >
                                                      <span>{tag}</span>
                                                </Link>
                                          ))}
                                    </div>

                                    <div>{/* Recommended Blogs */}</div>
                              </>
                        )
                  )}
            </div>
      );
};

export default Page;
