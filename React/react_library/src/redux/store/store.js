import { configureStore } from "@reduxjs/toolkit";
import { libApi } from "../services/libApi";

export const Store = configureStore({
    reducer:{
        [libApi.reducerPath]:libApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([libApi.middleware]),
})