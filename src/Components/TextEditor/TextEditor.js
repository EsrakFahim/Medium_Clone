"use client";

import React, { useEffect, useMemo, useRef } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ placeholder, content, setContent }) => {
      const editor = useRef(null);

      // Load the saved content from local storage when the component mounts
      useEffect(() => {
            const savedContent = localStorage.getItem("editorContent");
            if (savedContent) {
                  setContent(savedContent);
            }
      }, [setContent]);

      // Function to handle content changes on blur (when the editor loses focus)
      const handleBlur = (newContent) => {
            setContent(newContent);
            localStorage.setItem("editorContent", newContent); // Save the content to local storage
      };

      const config = useMemo(
            () => ({
                  readonly: false, // all options from https://xdsoft.net/jodit/docs/
                  placeholder:
                        content === "" ? placeholder || "Start typing..." : "",
            }),
            [placeholder, content]
      );

      return (
            <div>
                  <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={handleBlur} // Update content when the editor loses focus
                        onChange={() => {}} // Keep onChange to prevent warnings, but do nothing
                  />
            </div>
      );
};

export default TextEditor;
