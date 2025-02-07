const GroceryItem = ({ item, onDelete }) => {
  return (
    <div className="grocery-item">
      <span>{item.name}</span>
      <span>
        {item.quantity} {item.unit}
      </span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

export default GroceryItem;
