import React from "react";
import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiCircleMinus, CiBookmarkPlus } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({blog}) => {
      return (
            <div>
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
                                                {blog.title}
                                          </h2>
                                          <p>{blog.subtitle}</p>
                                    </div>
                              </div>
                              <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                          <p>
                                                {new Date(
                                                      blog?.createdAt
                                                ).toLocaleDateString("en-GB", {
                                                      day: "numeric",
                                                      month: "short",
                                                      year: "numeric",
                                                })}
                                          </p>
                                          <span className="flex items-center gap-2">
                                                <SlLike />
                                                <span>22</span>
                                          </span>
                                          <span className="flex items-center gap-2">
                                                <FaRegCommentAlt />
                                                <span>22</span>
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
                                    src={blog.blogCoverImage}
                                    alt={blog.title}
                                    width={200}
                                    height={200}
                                    className="rounded-md w-56 aspect-square"
                              />
                        </div>
                  </Link>
            </div>
      );
};

export default BlogCard;
