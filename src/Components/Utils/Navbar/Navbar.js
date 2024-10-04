import React from "react";
import { LuFileEdit } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
      return (
            <div className="px-10 py-6 bg-neutral-100">
                  <div className="flex items-center justify-between">
                        <div>
                              <Link
                                    href="/"
                                    className=""
                              >
                                    <h1 className="text-3xl font-semibold ">
                                          Blog
                                    </h1>
                              </Link>
                        </div>
                        <div className="flex items-center gap-6">
                              <Link
                                    href="/write"
                                    className="flex items-center gap-2 "
                              >
                                    <LuFileEdit className="text-3xl" />
                                    <p className="text-lg font-light text-neutral-400">
                                          Write Now
                                    </p>
                              </Link>
                              <Link
                                    href="/profile"
                                    className="flex items-center gap-2"
                              >
                                    <FiUser className="text-3xl" />
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default Navbar;
