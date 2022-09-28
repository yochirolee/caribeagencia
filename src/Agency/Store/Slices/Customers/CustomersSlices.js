import { createSlice } from '@reduxjs/toolkit';
export const CustomersSliceSlice = createSlice({
    name: 'CustomersSlice',
    initialState:{},
    reducers: {
        increment: (state,/*action*/) => {
            state.value += 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } =  CustomersSliceSlice.actions;