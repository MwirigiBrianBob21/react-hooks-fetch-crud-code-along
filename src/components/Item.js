import React from "react";


// U1c. Destructuring the onUpdateItem prop to call when
// we have the updated item response from the server
function Item({ item, onUpdateItem, onDeleteItem }) {
    // DELETE
    //D1. event handler for clicking delete button
  function handleDeleteClick() {
    // console.log(item)
    // D2. our delete request -y
    // no body, no headers, just the method option
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    // D3a. call onDeleteItem, passing the deleted item
    .then(()=> onDeleteItem(item))

  }

  {/* UPDATING THE STATE */}
      {/* U1. Adding function to handle button click */}
      function handleAddToCartClick() {
        console.log("clicked item:", item)
        // U2. Call onUpdateItem, passing the data returned from the
        // fetch request
        fetch(`http://localhost:4000/items/${item.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isInCart: !item.isInCart,
          }),
        })
        .then((response)=> response.json())
        .then((updatedItem) => onUpdateItem(updatedItem))

      }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>

      {/* U1a. adding the onClick listener */}
      <button className={item.isInCart ? "remove" : "add"} 
      onClick={handleAddToCartClick}>
      {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      {/* D1a. Adding onClick handler */}
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
