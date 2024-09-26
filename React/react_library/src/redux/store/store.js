import { configureStore } from "@reduxjs/toolkit";
import { libApi } from "../services/libApi";
import { Book } from "../services/Book";

export const Store = configureStore({
    reducer:{
        [libApi.reducerPath]:libApi.reducer,
        [Book.reducerPath]:Book.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([libApi.middleware,Book.middleware]),
})