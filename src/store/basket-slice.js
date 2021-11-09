import { createSlice } from "@reduxjs/toolkit";

const initialBasketState = {
  items: [],
  totalPrice: 0
};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialBasketState,
  reducers: {
    addItemToBasket(state, action) {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
        
        if (!existingItem) {
            //Safe to mutate 
            state.items.push({
                id: newItem.id,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
                name: newItem.name
            });
        } else {
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        }
        
        state.totalPrice += newItem.price;

    },

    removeItemFromBasket(state,action) {
        const id = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        state.totalPrice -= existingItem.price;

        if (existingItem.quantity === 1) {
            state.items = state.items.filter(item => item.id !== id);
        } else  {
            existingItem.quantity--;
            existingItem.totalPrice-= existingItem.price;
        }
    }
  },
});

export const basketActions = basketSlice.actions;
export default basketSlice;
