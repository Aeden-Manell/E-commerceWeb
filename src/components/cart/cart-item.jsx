import React, { useContext } from "react";
import { AppleStoreContext } from "../context/AppleStoreContext";

// Functional component responsible for rendering individual items in the cart
export const CartItem = (props) => {
  // Destructuring props to extract data for each item
  const { id, productName, price, productImage, briefdescription, color } = props.data;

  // Accessing cart-related functions and state from the AppleStoreContext using the useContext hook
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(AppleStoreContext);

  return (
    <div className="cartItem" id="productItem">
      {/* Rendering product image */}
      <img src={productImage} className="product-img" />

      {/* Container for product description */}
      <div className="description" id="description">
        {/* Rendering product name */}
        <p className="product-name">{productName}</p>
        {/* Rendering product color */}
        <p className="product-color">{color}</p>
        {/* Rendering brief product description */}
        <p className="brief-description">{briefdescription}</p>
        {/* Rendering product price and quantity */}
        <p className="product-price"> Price: ${price} x {cartItems[id]}</p>

        {/* Container for handling quantity modification */}
        <div className="countHandler">
          {/* Button to decrease quantity */}
          <button onClick={() => removeFromCart(id)} id="subtraction-icon"> - </button>
          {/* Input field to display and modify quantity */}
          <input
            id="inputValue"
            value={cartItems[id]} // Displaying current quantity
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)} // Updating quantity on change
          />
          {/* Button to increase quantity */}
          <button onClick={() => addToCart(id)} id="plus-icon"> + </button>
        </div>
      </div>
    </div>
  );
};

