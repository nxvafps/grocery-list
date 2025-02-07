import React, { useRef } from "react";

const RecipeForm = ({ onAddRecipe }) => {
  const inputRef = useRef();

  const handleSubmit = () => {
    if (inputRef.current) {
      onAddRecipe(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddRecipe(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="new-recipe">
      <input
        type="text"
        ref={inputRef}
        placeholder="New recipe name"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Add Recipe</button>
    </div>
  );
};

export default RecipeForm;
