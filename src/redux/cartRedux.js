import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
        itemsInCart: [],
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload.product);
            state.total += action.payload.price;
            state.itemsInCart.push(action.payload.id);
        },
        emptyCart: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
            state.itemsInCart = [];
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            state.products = action.payload.products;
            state.total -= action.payload.price;
            state.itemsInCart = action.payload.itemsInCart;
        },
    },
});

export const { addProduct, emptyCart, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;