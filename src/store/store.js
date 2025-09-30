import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../slice/auth';
import ProductReducer from '../slice/product.slice';


export default configureStore({
  reducer: {
    auth: AuthReducer,
    product: ProductReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
