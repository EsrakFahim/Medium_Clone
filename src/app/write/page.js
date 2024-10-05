"use client";

import React, { useEffect, useState } from "react";
import TextEditor from "@/Components/TextEditor/TextEditor";
import { useForm } from "react-hook-form";
import TagsEditor from "@/Components/TagsEditor/TagsEditor";
import Image from "next/image";
import axios from "axios";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

const Page = ({ placeholder }) => {
      const [content, setContent] = useState("");
      const [productTags, setProductTags] = useState([]);
      const [imageSrc, setImageSrc] = useState("");
      const [imgLiveUrl, setImgLiveUrl] = useState("");
      const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
      } = useForm();

      // Load the saved data from localStorage when the component mounts
      useEffect(() => {
            const savedTitle = localStorage.getItem("blogTitle");
            const savedSubtitle = localStorage.getItem("blogSubtitle");
            const savedTags = localStorage.getItem("productTags");

            if (savedTitle) register("blogTitle", { value: savedTitle });
            if (savedSubtitle)
                  register("blogSubtitle", { value: savedSubtitle });
            if (savedTags) setProductTags(JSON.parse(savedTags)); // Parse string to array
      }, [register]);

      // Save the form data to localStorage on change
      const handleInputChange = (name, value) => {
            localStorage.setItem(name, value);
      };

      const removeTags = (tagsState, setTagsState, indexToRemove) => {
            const newTags = tagsState.filter(
                  (_, index) => index !== indexToRemove
            );
            setTagsState(newTags);
            localStorage.setItem("productTags", JSON.stringify(newTags)); // Save updated tags
      };

      const addTags = (tagsState, setTagsState, event) => {
            if (event.target.value !== "") {
                  const newTags = [...tagsState, event.target.value];
                  setTagsState(newTags);
                  localStorage.setItem("productTags", JSON.stringify(newTags)); // Save updated tags
                  event.target.value = "";
            }
      };

      const handleData = (data) => {
            const blogData = {
                  title: data.blogTitle,
                  subtitle: data.blogSubtitle,
                  content: content,
                  tags: productTags,
            };
            console.log(blogData);

            // Clear local storage after submission
            localStorage.removeItem("blogTitle");
            localStorage.removeItem("blogSubtitle");
            localStorage.removeItem("editorContent");
            localStorage.removeItem("productTags");

            setContent("");
            setProductTags([]);
            reset();
      };

      const handleUploadClick = () => {
            document.getElementById("file-upload").click();
      };

      const handleImageUrl = async (file) => {
            const formData = new FormData();
            formData.append("blogImage", file);

            try {
                  const response = await axios.post(
                        "http://localhost:5050/api/v1/image/upload",
                        formData,
                        {
                              headers: {
                                    "Content-Type": "multipart/form-data",
                              },
                        }
                  );
                  if (response) {
                        toast.success(response.data.message);
                  }
                  console.log(response);
                  const imageUrl = response.data.data.url; // Assuming response includes image URL
                  setImgLiveUrl(imageUrl);
            } catch (error) {
                  console.error("Image upload failed:", error);
            }
      };

      // img render
      const handleFileChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();

                  reader.onload = (e) => {
                        setImageSrc(e.target.result);
                  };

                  reader.readAsDataURL(file);

                  // Upload the file
                  handleImageUrl(file);
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

      return (
            <div className="w-full lg:w-[75%] mx-auto py-10 px-10 flex flex-col lg:flex-row items-start gap-5">
                  <form
                        className="w-full lg:w-[70%]"
                        onSubmit={handleSubmit(handleData)}
                  >
                        {/* Title field */}
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
                                          {errors.blogTitle?.message}
                                    </p>
                              )}
                        </div>

                        {/* Sub title field */}
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
                                          {errors.blogSubtitle?.message}
                                    </p>
                              )}
                        </div>

                        {/* Image input field */}
                        <div className="mb-5 py-5 flex flex-col items-start justify-start gap-6">
                              {/* remember this field take an image and return an image url  */}
                              <label
                                    htmlFor="blog_Subtitle"
                                    className="text-black ml-1 text-[1.3em] leading-8"
                              >
                                    Blog Image{" "}
                                    <span className="text-sm text-gray-400">
                                          (It gives a url and use that url into
                                          your blog)
                                    </span>
                              </label>
                              <div
                                    className="rounded-md py-2 border-dashed border-2 border-gray-300 flex items-center justify-center cursor-pointer"
                                    onChange={handleFileChange}
                              >
                                    <div className="avatar-wrapper flex items-center justify-center">
                                          {imageSrc ? (
                                                <div className="avatar">
                                                      <div className="w-24 rounded-full">
                                                            <Image
                                                                  className="profile-pic object-cover"
                                                                  src={imageSrc}
                                                                  alt="Profile Pic"
                                                                  width={100}
                                                                  height={100}
                                                            />
                                                      </div>
                                                </div>
                                          ) : (
                                                <div
                                                      className="upload-button flex flex-col items-center gap-2 text-gray-400"
                                                      onClick={
                                                            handleUploadClick
                                                      }
                                                >
                                                      <h5>upload your photo</h5>
                                                </div>
                                          )}
                                          <input
                                                type="file"
                                                id="file-upload"
                                                accept="image/*"
                                                className="file-upload"
                                                style={{
                                                      display: "none",
                                                }}
                                          />
                                    </div>
                              </div>
                              <div>
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
                        </div>

                        {/* Content field */}
                        <TextEditor
                              placeholder={placeholder}
                              content={content}
                              setContent={setContent}
                        />

                        {/* Submit button */}
                        <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
                        >
                              Submit
                        </button>
                  </form>
                  <div className="w-full lg:w-[30%]">
                        {/* Tags field */}
                        <div>
                              <div>
                                    <label className="text-black ml-1 text-[1.3em] leading-8">
                                          Tags
                                          <span className="text-sm text-gray-400">
                                                {" "}
                                                (Press enter to add tags)
                                          </span>
                                    </label>
                              </div>
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
