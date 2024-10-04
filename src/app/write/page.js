"use client";

import React, { useEffect, useState } from "react";
import TextEditor from "@/Components/TextEditor/TextEditor";
import { useForm } from "react-hook-form";
import TagsEditor from "@/Components/TagsEditor/TagsEditor";

const Page = ({ placeholder }) => {
      const [content, setContent] = useState("");
      const [productTags, setProductTags] = useState([]);
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

      return (
            <div className="max-w-[70%] mx-auto py-10">
                  <form onSubmit={handleSubmit(handleData)}>
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

                        {/* Content field */}
                        <TextEditor
                              placeholder={placeholder}
                              content={content}
                              setContent={setContent}
                        />

                        {/* Tags field */}
                        <div>
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

                        {/* Submit button */}
                        <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
                        >
                              Submit
                        </button>
                  </form>
            </div>
      );
};

export default Page;
