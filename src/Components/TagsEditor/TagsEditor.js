import React, { useState } from "react";
import "./AdminPanelStyle.css";

const TagsEditor = ({ addTags, removeTags, tags }) => {
      const [inputValue, setInputValue] = useState("");

      const handleInputChange = (event) => {
            setInputValue(event.target.value);
      };

      const handleKeyUp = (event) => {
            if (event.key === "Enter") {
                  addTags(event);
            }
      };

      return (
            <div className="tags-input mt-4">
                  <ul id="tags">
                        {tags?.map((tag, index) => (
                              <li key={index} className="tag">
                                    <span className="tag-title">{tag}</span>
                                    <span
                                          className="tag-close-icon"
                                          onClick={() => removeTags(index)}
                                    >
                                          x
                                    </span>
                              </li>
                        ))}
                  </ul>
                  <input
                        type="text"
                        onChange={handleInputChange}
                        onKeyUp={handleKeyUp}
                        placeholder="Press enter to add tags"
                  />
            </div>
      );
};

export default TagsEditor;
