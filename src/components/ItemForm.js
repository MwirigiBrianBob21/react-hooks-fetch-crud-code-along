import React, { useState } from "react";
// onAddItem- prop destructuring
function ItemForm({onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");


  //2. Add function to handle submissions
  function handleSubmit(e) {
    e.preventDefault();
    // console.log("name:", name)
    // console.log("category:", category)

    // 3. Creating data that will be posted after submit

    const itemData = {
      name:name,
      category: category,
      isInCart: false
    }
    // console.log(itemData)
  
  //4. fetch request
    // fetch takes in two parameters
    //
  fetch("http://localhost:4000/items", {
    method: "POST",
    headers: {
      "Content-Type":
      "application/json",
    },
    body: JSON.stringify(itemData),
  })

  // when submitted, the newItem is added.
  // however, the newItem is added after a refresh is done
  // This is solved by  5. updating the state


    .then((response) => response.json())
    //5 .then((newItem) => console.log(newItem))

    //6. calling the onAddItem prop with the newItem    
    .then((newItem) => 
    onAddItem(newItem))

}
 
  return (
    //1. handleSubmit for form
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit" >Add to List</button>
    </form>
  );
}

export default ItemForm;
