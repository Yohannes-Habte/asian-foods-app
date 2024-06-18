export const CART_ACTION = {
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
};

const CartReducer = (state, action) => {
  switch (action.type) {

    // Add item to cart
    case CART_ACTION.ADD_ITEM_TO_CART: {
      
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.sys.id === newItem.sys.id
      );

      const cartItems = existingItem
        ? state.cartItems.map((item) =>
            item.sys.id === existingItem.sys.id ? newItem : item
          )
        : [...state.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cartItems };
    }

    // Remove item from cart
    case CART_ACTION.REMOVE_ITEM_FROM_CART: {
      const cartItems = state.cartItems.filter(
        (item) => item.sys.id !== action.payload.sys.id
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };
    }

    // Default state
    default:
      return state;
  }
};

export default CartReducer;
