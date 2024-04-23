// Importing necessary modules from React and the product list
import { createContext, useState } from "react";
import { AppleStoreItems } from "../../products";

// Creating a context for the Apple Store and initializing it with null
export const AppleStoreContext = createContext(null);

// Function to generate a default shopping cart with all items initialized to 0 quantity
const getDefaultCart = () => {
  let cart = {};
  // Loop through the AppleStoreItems array to initialize each item's quantity to 0
  for (let i = 1; i < AppleStoreItems.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

// Component responsible for providing the Apple Store context to its children
export const AppleStoreContextProvider = (props) => {
  // State hook to manage the shopping cart items
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Function to calculate the total amount of the items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // Loop through the items in the cart
    for (const item in cartItems) {
      // Check if the quantity of the item is greater than 0
      if (cartItems[item] > 0) {
        // Find the corresponding item information from AppleStoreItems
        let itemInfo = AppleStoreItems.find((product) => product.id === Number(item));
        // Calculate the total amount by multiplying the item's price with its quantity
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    // Update the cart items state by incrementing the quantity of the specified item
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    // Update the cart items state by decrementing the quantity of the specified item
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // Function to update the quantity of an item in the cart
  const updateCartItemCount = (newAmount, itemId) => {
    // Update the cart items state with the new quantity of the specified item
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  // Function to clear the cart, effectively checking out
  const checkout = () => {
    // Reset the cart items state to the default empty cart
    setCartItems(getDefaultCart());
  };

  // Value to be provided by the context
  const contextValue = {
    cartItems, // Current items in the cart
    addToCart, // Function to add an item to the cart
    updateCartItemCount, // Function to update the quantity of an item in the cart
    removeFromCart, // Function to remove an item from the cart
    getTotalCartAmount, // Function to calculate the total amount of the items in the cart
    checkout, // Function to clear the cart, effectively checking out
  };

  // Providing the context value to the children components
  return (
    <AppleStoreContext.Provider value={contextValue}>
      {props.children} {/* Rendering the children components */}
    </AppleStoreContext.Provider>
  );
};
