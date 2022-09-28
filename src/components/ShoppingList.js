import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  //1. Adding useEffect hook
  // 1a) WHEN X EVENT OCCURS- side-effect- useEffect
  

  useEffect(()=> {

    //1b) MAKE Y FETCH REQUEST, GET items, and add them to state
    fetch("http://localhost:4000/items")
    .then((response)=> response.json())
    .then((items)=>setItems(items))
  }, []);

  // D3. Updating the state after item is deleted

  // 
  function handleDeleteItem(deletedItem) {
    // console.log("In ShoppingCart", deletedItem)

    // D5. we need to setState with a new array that removes the deleted item
    // from the list. 
    // Z STATE
    // .filter will help create new array
    const updatedItems = items.filter((item)=> 
    item.id !== deletedItem.id);
    setItems(updatedItems)
  }

  //U1. Updating the state in the parent component
  // after add to cart is clicked. Adding 
  // a call back function to handle the new state

  function handleUpdateItem(updatedItem) {
    // console.log("In ShoppingCart:", updatedItem)
    // U.LAST STEP
    //Calling the setState in shopping list with a new array
    // that replaces one item with the newupdated item from the server.
    // you can use .map
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  // 5. updating the state after it is submitted from ItemForm
  function handleAddItem(newItem){
    // console.log("In shopping list", newItem)
    // 7. updating state with a new array that has our item from submit
    // Use spread operator
    setItems([...items,
    newItem]);

    // Now, each time a user submits the form, 
    // a new item is added to database as well as client-side state
  }

  return (
    <div className="ShoppingList">
      {/* adding the onAddItem prop! */}
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* U1b. Passing the callback function as prop
        down to item. Pass as onUpdateItem  */}
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
