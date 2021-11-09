import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./product-slice";
import basketSlice from "./basket-slice";

const store = configureStore({
  reducer: { product: productSlice.reducer, basket: basketSlice.reducer},
});

export default store;