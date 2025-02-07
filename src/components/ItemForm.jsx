import React, { useState } from "react";

const ItemForm = ({ recipes, onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "pcs",
    recipe: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    onAddItem(newItem);
    setNewItem({ name: "", quantity: 1, unit: "pcs", recipe: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        placeholder="Item name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        min="1"
        value={newItem.quantity}
        onChange={(e) =>
          setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })
        }
      />
      <select
        value={newItem.unit}
        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
      >
        <option value="pcs">pcs</option>
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="l">l</option>
        <option value="ml">ml</option>
      </select>
      <select
        value={newItem.recipe}
        onChange={(e) => setNewItem({ ...newItem, recipe: e.target.value })}
      >
        <option value="">No Recipe</option>
        {recipes.map((recipe) => (
          <option key={recipe} value={recipe}>
            {recipe}
          </option>
        ))}
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
