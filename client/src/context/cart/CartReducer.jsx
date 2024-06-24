export const CART_ACTION = {
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  CLEAR_CART: 'CLEAR_CART',
};

const CartReducer = (state, action) => {
  switch (action.type) {
    // Add item to cart
    case CART_ACTION.ADD_ITEM_TO_CART: {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.food_id === newItem.food_id
      );

      const cartItems = existingItem
        ? state.cartItems.map((item) =>
            item.food_id === existingItem.food_id ? newItem : item
          )
        : [...state.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cartItems };
    }

    // Remove item from cart
    case CART_ACTION.REMOVE_ITEM_FROM_CART: {
      const cartItems = state.cartItems.filter(
        (item) => item.food_id !== action.payload.food_id
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cartItems };
    }

    case CART_ACTION.CLEAR_CART:
      return { ...state, cart:[] };

    // Default state
    default:
      return state;
  }
};

export default CartReducer;
