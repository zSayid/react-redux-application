import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthReducer from "../slice/auth";
import ProductReducer from "../slice/product.slice";
import CartReducer from "../slice/cart.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // ✅ only persist cart (auth, product reset on refresh)
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  cart: CartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
