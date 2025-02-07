import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    unit: "pcs",
    recipe: "",
  });

  useEffect(() => {
    const savedItems = localStorage.getItem("groceryItems");
    const savedRecipes = localStorage.getItem("recipes");
    if (savedItems) setGroceryItems(JSON.parse(savedItems));
    if (savedRecipes) setRecipes(JSON.parse(savedRecipes));
  }, []);

  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(groceryItems));
  }, [groceryItems]);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    setGroceryItems([...groceryItems, { ...newItem, id: Date.now() }]);
    setNewItem({ name: "", quantity: 1, unit: "pcs", recipe: "" });
  };

  const deleteItem = (id) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
  };

  const addRecipe = (recipeName) => {
    if (!recipeName || recipes.includes(recipeName)) return;
    setRecipes([...recipes, recipeName]);
  };

  return (
    <div className="container">
      <h1>Grocery List</h1>

      <form onSubmit={addItem} className="add-item-form">
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
          onChange={(e) => {
            setNewItem({ ...newItem, recipe: e.target.value });
          }}
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

      <div className="new-recipe">
        <input
          type="text"
          id="newRecipe"
          placeholder="New recipe name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addRecipe(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <button
          onClick={(e) => {
            const input = document.getElementById("newRecipe");
            addRecipe(input.value);
            input.value = "";
          }}
        >
          Add Recipe
        </button>
      </div>

      <div className="grocery-list">
        {[...recipes, ""].map((recipe) => (
          <div key={recipe} className="recipe-group">
            <h2>{recipe || "Ungrouped Items"}</h2>
            {groceryItems
              .filter((item) =>
                recipe === "" ? !item.recipe : item.recipe === recipe
              )
              .map((item) => (
                <div key={item.id} className="grocery-item">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} {item.unit}
                  </span>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
