import { useState, useEffect } from "react";
import "./App.css";
import ItemForm from "./components/ItemForm";
import RecipeForm from "./components/RecipeForm";
import RecipeGroup from "./components/RecipeGroup";

function App() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [recipes, setRecipes] = useState([]);

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

  const addItem = (newItem) => {
    setGroceryItems([...groceryItems, { ...newItem, id: Date.now() }]);
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

      <ItemForm recipes={recipes} onAddItem={addItem} />
      <RecipeForm onAddRecipe={addRecipe} />

      <div className="grocery-list">
        {[...recipes, ""].map((recipe) => (
          <RecipeGroup
            key={recipe}
            recipe={recipe}
            items={groceryItems.filter((item) =>
              recipe === "" ? !item.recipe : item.recipe === recipe
            )}
            onDeleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
