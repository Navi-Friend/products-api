import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/slice";
import uiReducer from "./ui/slice";

const store = configureStore({
    reducer: {
        products: productReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
