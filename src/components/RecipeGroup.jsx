import React from "react";
import GroceryItem from "./GroceryItem";

const RecipeGroup = ({ recipe, items, onDeleteItem }) => {
  return (
    <div className="recipe-group">
      <h2>{recipe || "Ungrouped Items"}</h2>
      {items.map((item) => (
        <GroceryItem key={item.id} item={item} onDelete={onDeleteItem} />
      ))}
    </div>
  );
};

export default RecipeGroup;
