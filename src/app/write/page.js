"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
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

      const removeTags = (tagsState, setTagsState, indexToRemove) => {
            setTagsState([
                  ...tagsState.filter((_, index) => index !== indexToRemove),
            ]);
      };

      const addTags = (tagsState, setTagsState, event) => {
            if (event.target.value !== "") {
                  setTagsState([...tagsState, event.target.value]);
                  event.target.value = "";
            }
      };

      const selectedTags = (tags) => {
            //console.log(tags);
      };

      const handleData = (data) => {
            const blogData = {
                  title: data.blogTitle,
                  subtitle: data.blogSubtitle,
                  content: content,
                  tags: productTags,
            };
            console.log(blogData);
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
                                    selectedTags={selectedTags}
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
