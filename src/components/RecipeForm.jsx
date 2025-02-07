import { useState } from "react";

const RecipeForm = ({ onAddRecipe }) => {
  const [recipeName, setRecipeName] = useState("");

  const handleSubmit = () => {
    if (recipeName.trim()) {
      onAddRecipe(recipeName);
      setRecipeName("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && recipeName.trim()) {
      onAddRecipe(recipeName);
      setRecipeName("");
    }
  };

  return (
    <div className="new-recipe">
      <input
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        placeholder="New recipe name"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Add Recipe</button>
    </div>
  );
};

export default RecipeForm;
