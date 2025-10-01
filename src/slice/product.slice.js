import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  products: [],
  selectedProduct: null,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Action to set the list of products
    getProductStart: (state, action) => {
      state.isloading = true;
    },

    getProductSuccess: (state, action) => {
      state.isloading = false;
      state.products = action.payload;
      state.status = "succeeded";
    },
    getProductFailure: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.status = "failed";
    },

    // Action to add a new item
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    // Action to select a item
    selectProduct: (state, action) => {
      state.isloading = false;
      state.selectedProduct = action.payload;
      state.status = "succeeded";
    },

   
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  addProduct,
  selectProduct,

} = productSlice.actions;
export default productSlice.reducer;
