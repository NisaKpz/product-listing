import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
    items: [],
    companies: []
};

const productSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        setAllItems(state,action) {
            state.items = action.payload.items
        },
        setAllCompanies(state,action) {
            state.companies = action.payload.companies;
        }
    }

});

export const productActions = productSlice.actions;
export default productSlice;