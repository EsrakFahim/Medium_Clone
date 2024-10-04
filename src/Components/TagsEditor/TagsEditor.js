import React, { useState } from "react";
import "./AdminPanelStyle.css";

const TagsEditor = ({ addTags, removeTags, tags }) => {
      const [inputValue, setInputValue] = useState("");

      const handleInputChange = (event) => {
            setInputValue(event.target.value);
      };

      const handleKeyUp = (event) => {
            // Prevent form submission when Enter is pressed
            if (event.key === "Enter") {
                  event.preventDefault(); // Prevent form from submitting
                  if (inputValue.trim() !== "") {
                        addTags(event); // Add the tag
                        setInputValue(""); // Clear input field
                  }
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
                        value={inputValue} // Bind the input value to state
                        onChange={handleInputChange}
                        onKeyUp={handleKeyUp}
                        placeholder="Press enter to add tags"
                  />
            </div>
      );
};

export default TagsEditor;
