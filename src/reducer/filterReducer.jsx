const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS": {
      let priceArr = action.payload.map((currElem) => currElem.price);
      const maxPrice = Math.max(...priceArr);
      return {
        ...state,
        filter_Products: [...action.payload],
        all_Products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    }

    case "SET_GRIDVIEW":
      return {
        ...state,
        gridview: true,
      };

    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORT_PRODUCTS": {
      let newSortData;

      const { filter_Products, sorting_value } = state;
      let tempSortData = [...filter_Products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowToHigh") {
          return a.price - b.price;
        }
        if (sorting_value === "highToLow") {
          return b.price - a.price;
        }
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };
      newSortData = tempSortData.sort(sortingProducts);
      return {
        ...state,
        filter_Products: newSortData,
      };
    }
    case "GET_INPUT_VALUE":
      return {
        ...state,
        search_value: action.payload,
      };

    case "UPDATE_FILTER_VALUE": {
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    }

    case "FILTER_PRODUCTS": {
      let { all_Products } = state;
      let tempFilterProducts = [...all_Products];

      const { text, category, company, price } = state.filters;
      if (text) {
        tempFilterProducts = tempFilterProducts.filter((currElem) => {
          return currElem.name.toLowerCase().includes(text);
        });
      }
      if (category !== "All") {
        tempFilterProducts = tempFilterProducts.filter((currElem) => {
          return currElem.category === category;
        });
      }
      if (company !== "All") {
        tempFilterProducts = tempFilterProducts.filter((currElem) => {
          return currElem.company.toLowerCase() === company.toLowerCase();
        });
      }

      if (price === 0) {
        tempFilterProducts = tempFilterProducts.filter(
          (currElem) => currElem.price === price
        );
      } else {
        tempFilterProducts = tempFilterProducts.filter(
          (currElem) => currElem.price <= price
        );
      }

      return {
        ...state,
        filter_Products: tempFilterProducts,
      };
    }

    case "CLEAR_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "All",
          company: "All",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: 0,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
