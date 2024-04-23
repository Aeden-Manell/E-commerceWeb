import React, { useContext } from "react";
import { AppleStoreContext } from "../context/AppleStoreContext"; // Importing the AppleStoreContext to access cart-related functions and state
import { AppleStoreItems } from "../../products"; // Importing the list of Apple Store items
import { CartItem } from "./cart-item"; // Importing the CartItem component for rendering individual items
import "./cart.css"; // Importing CSS styles for the cart component

// Functional component responsible for rendering the cart
export const Cart = () => {
  // Accessing cart-related functions and state from the AppleStoreContext using the useContext hook
  const { cartItems, getTotalCartAmount } = useContext(AppleStoreContext);
  // Calculating the total amount of the items in the cart
  const totalAmount = getTotalCartAmount();

  return (
    <div className="cart">

      {/* Container for rendering individual cart items */}
      <div className="cart">
        {/* Mapping over AppleStoreItems to render CartItem component for each item */}
        {AppleStoreItems.map((product) => {
          // Checking if the quantity of the current product in the cart is not zero
          if (cartItems[product.id] !== 0) {
            // Rendering CartItem component for the current product
            return <CartItem data={product} />;
          }
        })}
      </div>

      {/* Rendering total amount if there are items in the cart */}
      {totalAmount > 0 ? (
        <div className="checkout">
          {/* Displaying the total amount */}
          <p id="totalp"> Bag Total: ${totalAmount} </p>
        </div>
      ) : (
        // Rendering nothing if the cart is empty
        <></>
      )}
    </div>
  );
};

