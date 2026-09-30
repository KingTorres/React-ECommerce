import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/cartSlice";

export const store = configureStore({
    reducer: {
        productComputer: productReducer
    }
})