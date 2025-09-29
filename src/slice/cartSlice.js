import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const exsistingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!exsistingItem) {
                state.items.push()
            }
        }
    }
})
