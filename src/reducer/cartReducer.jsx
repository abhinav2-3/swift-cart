const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let { id, color, amount, product } = action.payload;

      const existingProduct = state.cart.find(
        (product) => product.id === id + color
      );

      if (existingProduct) {
        let updatedProduct = state.cart.map((currItem) => {
          if (currItem.id === id + color) {
            let newAmount = currItem.amount + amount;

            if (newAmount >= currItem.max) {
              newAmount = currItem.max;
            }
            return {
              ...currItem,
              amount: newAmount,
            };
          } else {
            return currItem;
          }
        });
        return { ...state, cart: updatedProduct };
      } else {
        let cartProduct = {
          id: id + color,
          color,
          amount,
          name: product.name,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    }

    case "REMOVE_PRODUCT": {
      const id = action.payload;
      let updatedProduct = state.cart.filter((currElem) => currElem.id !== id);
      return {
        ...state,
        cart: updatedProduct,
      };
    }

    case "CLEAR_CART":
      return {
        cart: [],
      };

    case "SET_INCREMENT": {
      let updateProduct = state.cart.map((currElem) => {
        if (currElem.id === action.payload) {
          let incAmount = currElem.amount++;
          if (incAmount >= currElem.max) {
            incAmount = currElem.max;
          }
          return {
            ...currElem,
            amount: incAmount,
          };
        } else {
          return currElem;
        }
      });
      return {
        ...state,
        cart: updateProduct,
      };
    }

    case "SET_DECREMENT": {
      let updatedProduct = state.cart.map((currElem) => {
        if (currElem.id === action.payload) {
          let decAmount = currElem.amount--;
          if (decAmount <= 1) decAmount = 1;
          return {
            ...currElem,
            amount: decAmount,
          };
        } else {
          return currElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    }

    case "CART_TOTAL_PRICE": {
      let total_price = state.cart.reduce((initialValue, currElem) => {
        let { price, amount } = currElem;
        initialValue += price * amount;
        return initialValue;
      }, 0);
      return {
        ...state,
        total_price,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
