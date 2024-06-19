import { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  loading: false,
  error: null,
};

export const CartContext = createContext(initialState);
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);


  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
