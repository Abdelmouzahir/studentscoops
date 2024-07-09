// // cart-context.js
// import { createContext, useState , useEffect } from 'react';

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]); // initial cart data
//   const [cartCounter, setCartCounter] = useState(0);
//   const [recentlyAdded, setRecentlyAdded] = useState(null);


//   useEffect(() => {
//     if (recentlyAdded) {
//       const timeout = setTimeout(() => {
//         setRecentlyAdded(null);
//       }, 3000); // Adjust the timeout duration as needed (e.g., 3000 milliseconds)
//       return () => clearTimeout(timeout);
//     }
//   }, [recentlyAdded]);

//   const addToCart = (item) => {
//     const existingItem = cart.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       // Item already exists in cart, increment quantity
//       const updatedCart = cart.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       );setCart(updatedCart);
//       setCartCounter(cartCounter + 1);
//     } 
      
//       else {
//       // Item doesn't exist in cart, add it with quantity 1
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//     setRecentlyAdded(item);
//     setCartCounter(cartCounter + 1);
//   };;

//   const removeFromCart = (itemId, quantity = 1) => {
//     const existingItem = cart.find((item) => item.id === itemId);
//     if (existingItem) {
//       if (existingItem.quantity <= quantity) {
//         setCart(cart.filter((item) => item.id!== itemId));
//       } else {
//         setCart(
//           cart.map((item) =>
//             item.id === itemId? {...item, quantity: item.quantity - quantity } : item
//           )
//         );
//       }
//     }
//     setCartCounter(cartCounter - 1);
//   };

//   const getTotal = () => {
//     return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
//       {children} 
//     </CartContext.Provider>
//   );
// };

// export { CartProvider, CartContext };