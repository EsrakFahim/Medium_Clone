"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Import X icon
import toast from "react-hot-toast";
import TagsEditor from "@/Components/TagsEditor/TagsEditor";
const TextEditor = dynamic(() => import("@/Components/TextEditor/TextEditor"), {
      ssr: false,
});

const Page = ({ placeholder }) => {
      const [content, setContent] = useState("");
      const [productTags, setProductTags] = useState([]);
      const [imageSrc, setImageSrc] = useState("");
      const [imgLiveUrl, setImgLiveUrl] = useState("");
      const [blogCoverImage, setBlogCoverImage] = useState("");
      const [blogCoverImageFile, setBlogCoverImageFile] = useState("");
      const [loadImage, setLoadImage] = useState(false);
      const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
      } = useForm();

      useEffect(() => {
            const savedTitle = localStorage.getItem("blogTitle");
            const savedSubtitle = localStorage.getItem("blogSubtitle");
            const savedTags = localStorage.getItem("productTags");

            if (savedTitle) register("blogTitle", { value: savedTitle });
            if (savedSubtitle)
                  register("blogSubtitle", { value: savedSubtitle });
            if (savedTags) setProductTags(JSON.parse(savedTags));
      }, [register]);

      const handleInputChange = (name, value) => {
            localStorage.setItem(name, value);
      };

      const removeTags = (tagsState, setTagsState, indexToRemove) => {
            const newTags = tagsState.filter(
                  (_, index) => index !== indexToRemove
            );
            setTagsState(newTags);
            localStorage.setItem("productTags", JSON.stringify(newTags));
      };

      const addTags = (tagsState, setTagsState, event) => {
            if (event.target.value !== "") {
                  const newTags = [...tagsState, event.target.value];
                  setTagsState(newTags);
                  localStorage.setItem("productTags", JSON.stringify(newTags));
                  event.target.value = "";
            }
      };

      const handleData = async (data) => {
            const blogData = {
                  title: data.blogTitle,
                  subtitle: data.blogSubtitle,
                  content,
                  tags: productTags,
                  blogCoverImage: blogCoverImageFile,
            };
            console.log(blogData);

            const response = await axios.post(
                  "https://blog-server-4x1x55nqc-esrakfahims-projects.vercel.app/api/v1/blog/upload",
                  blogData,

                  {
                        headers: {
                              "Content-Type": "multipart/form-data",
                        },
                  }
            );

            if (response) {
                  toast.success(response.data.message);
            }

            localStorage.removeItem("blogTitle");
            localStorage.removeItem("blogSubtitle");
            localStorage.removeItem("editorContent");
            localStorage.removeItem("productTags");

            setContent("");
            setProductTags([]);
            setImageSrc("");
            setImgLiveUrl("");
            setBlogCoverImage("");
            setBlogCoverImageFile("");
            reset();
      };

      const handleUploadClick = () => {
            document.getElementById("file-upload").click();
      };

      const handleCoverImageUpload = () => {
            document.getElementById("blog-cover").click();
      };

      const handleImageUrl = async (file) => {
            setLoadImage(true);
            const formData = new FormData();
            formData.append("blogImage", file);

            try {
                  const response = await axios.post(
                        "https://blog-server-4x1x55nqc-esrakfahims-projects.vercel.app/api/v1/image/upload",
                        formData,
                        {
                              headers: {
                                    "Content-Type": "multipart/form-data",
                              },
                        }
                  );
                  if (response) {
                        setLoadImage(false);
                        toast.success(response.data.message);
                  }
                  const imageUrl = response.data.data.url;
                  setImgLiveUrl(imageUrl);
            } catch (error) {
                  console.error("Image upload failed:", error);
            }
      };

      // Image upload for blog inside the editor
      const handleFileChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();

                  reader.onload = (e) => {
                        setImageSrc(e.target.result);
                  };

                  reader.readAsDataURL(file);
                  handleImageUrl(file);
            }
      };

      // blog cover image
      const handleBlogCoverImage = (event) => {
            if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();

                  reader.onload = (e) => {
                        setBlogCoverImage(e.target.result);
                  };

                  reader.readAsDataURL(file);
                  setBlogCoverImageFile(file);
            }
      };

      const handleCopy = () => {
            navigator.clipboard
                  .writeText(imgLiveUrl)
                  .then(() => {
                        toast("Text copied to clipboard!");
                  })
                  .catch((err) => {
                        console.error("Failed to copy text: ", err);
                  });
      };

      const handleBlogCoverRemove = () => {
            setBlogCoverImage("");
            setBlogCoverImageFile("");
      };

      const handleRemoveImage = () => {
            setImageSrc("");
            setImgLiveUrl("");
      };

      return (
            <div className="py-10 px-10 flex flex-col lg:flex-row items-start gap-5">
                  <form
                        className="w-full lg:w-[70%]"
                        onSubmit={handleSubmit(handleData)}
                  >
                        <div className="mb-5 py-5 flex flex-col items-start justify-start gap-6">
                              <label
                                    htmlFor="blog_Title"
                                    className="text-black ml-1 text-[1.3em] leading-8"
                              >
                                    Blog Title
                              </label>
                              <input
                                    id="blog_title"
                                    autoComplete="off"
                                    placeholder="Title....*"
                                    type="text"
                                    {...register("blogTitle", {
                                          required: "Blog title is required",
                                    })}
                                    onChange={(e) =>
                                          handleInputChange(
                                                "blogTitle",
                                                e.target.value
                                          )
                                    }
                                    className="w-full border-b border-neutral-300 py-4 px-2 rounded-md block outline-none text-[1.3rem]"
                              />
                              {errors.blogTitle && (
                                    <p className="text-red-600">
                                          {errors.blogTitle.message}
                                    </p>
                              )}
                        </div>

                        <div className="mb-5 py-5 flex flex-col items-start justify-start gap-6">
                              <label
                                    htmlFor="blog_Subtitle"
                                    className="text-black ml-1 text-[1.3em] leading-8"
                              >
                                    Blog Subtitle
                              </label>
                              <input
                                    id="blog_subtitle"
                                    autoComplete="off"
                                    placeholder="Subtitle....*"
                                    type="text"
                                    {...register("blogSubtitle", {
                                          required: "Blog subtitle is required",
                                    })}
                                    onChange={(e) =>
                                          handleInputChange(
                                                "blogSubtitle",
                                                e.target.value
                                          )
                                    }
                                    className="w-full border-b border-neutral-300 py-4 px-2 rounded-md block outline-none text-[1.3rem]"
                              />
                              {errors.blogSubtitle && (
                                    <p className="text-red-600">
                                          {errors.blogSubtitle.message}
                                    </p>
                              )}
                        </div>

                        {/*  Blog Cover Image */}
                        <div className="mb-5 py-5 flex flex-col items-start justify-start gap-6 ">
                              <label
                                    htmlFor="blog_Subtitle"
                                    className="text-black ml-1 text-[1.3em] leading-8"
                              >
                                    Blog Cover Image{" "}
                              </label>
                              <div
                                    className={`rounded-md py-2 border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer `}
                                    onChange={handleBlogCoverImage}
                              >
                                    <div className="avatar-wrapper flex items-center justify-center relative">
                                          {blogCoverImage ? (
                                                <div className="avatar relative">
                                                      <div className="w-24 rounded-full">
                                                            <Image
                                                                  className="profile-pic object-cover"
                                                                  src={
                                                                        blogCoverImage
                                                                  }
                                                                  alt="Profile Pic"
                                                                  width={100}
                                                                  height={100}
                                                            />
                                                      </div>
                                                      <AiOutlineCloseCircle
                                                            onClick={
                                                                  handleBlogCoverRemove
                                                            }
                                                            className="absolute top-0 right-0 cursor-pointer text-red-600 text-xl"
                                                      />
                                                </div>
                                          ) : (
                                                <div
                                                      className="upload-button flex flex-col items-center gap-2 text-gray-400"
                                                      onClick={
                                                            handleCoverImageUpload
                                                      }
                                                >
                                                      <h5>Upload your photo</h5>
                                                </div>
                                          )}
                                          <input
                                                type="file"
                                                id="blog-cover"
                                                accept="image/*"
                                                className="file-upload"
                                                style={{ display: "none" }}
                                          />
                                    </div>
                              </div>
                        </div>

                        {/*  Img upload for blogs  */}
                        <div className="mb-5 py-5 flex flex-col items-start justify-start gap-6 ">
                              <label
                                    htmlFor="blog_Subtitle"
                                    className="text-black ml-1 text-[1.3em] leading-8"
                              >
                                    Blog Image{" "}
                                    <span className="text-sm text-gray-400">
                                          (It gives a URL to use in your blog)
                                    </span>
                              </label>
                              <div
                                    className={`rounded-md py-2 border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer ${
                                          loadImage
                                                ? "opacity-15"
                                                : "opacity-100"
                                    } `}
                                    onChange={handleFileChange}
                              >
                                    <div className="avatar-wrapper flex items-center justify-center relative">
                                          {imageSrc ? (
                                                <div className="avatar relative">
                                                      <div className="w-24 rounded-full">
                                                            <Image
                                                                  className="profile-pic object-cover"
                                                                  src={imageSrc}
                                                                  alt="Profile Pic"
                                                                  width={100}
                                                                  height={100}
                                                            />
                                                      </div>
                                                      <AiOutlineCloseCircle
                                                            onClick={
                                                                  handleRemoveImage
                                                            }
                                                            className="absolute top-0 right-0 cursor-pointer text-red-600 text-xl"
                                                      />
                                                </div>
                                          ) : (
                                                <div
                                                      className="upload-button flex flex-col items-center gap-2 text-gray-400"
                                                      onClick={
                                                            handleUploadClick
                                                      }
                                                >
                                                      <h5>Upload your photo</h5>
                                                </div>
                                          )}
                                          <input
                                                type="file"
                                                id="file-upload"
                                                accept="image/*"
                                                className="file-upload"
                                                style={{ display: "none" }}
                                          />
                                    </div>
                              </div>
                              {imgLiveUrl && (
                                    <p
                                          onClick={handleCopy}
                                          className="text-gray-500 flex items-center gap-3 cursor-pointer border border-gray-300 rounded-md p-2"
                                    >
                                          {imgLiveUrl}
                                          <MdOutlineContentCopy />
                                    </p>
                              )}
                        </div>

                        <TextEditor
                              placeholder={placeholder}
                              content={content}
                              setContent={setContent}
                        />

                        <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
                        >
                              Submit
                        </button>
                  </form>

                  <div className="w-full lg:w-[30%]">
                        <div>
                              <label className="text-black ml-1 text-[1.3em] leading-8">
                                    Tags{" "}
                                    <span className="text-sm text-gray-400">
                                          (Press enter to add tags)
                                    </span>
                              </label>
                              <TagsEditor
                                    selectedTags={() => {}}
                                    tags={productTags}
                                    removeTags={(index) =>
                                          removeTags(
                                                productTags,
                                                setProductTags,
                                                index
                                          )
                                    }
                                    addTags={(event) =>
                                          addTags(
                                                productTags,
                                                setProductTags,
                                                event
                                          )
                                    }
                              />
                        </div>
                  </div>
            </div>
      );
};

export default Page;
