import { configureStore } from "@reduxjs/toolkit";
import { libApi } from "../services/libApi";
import { userApi } from "../services/userApi";
import { authApi } from "../services/authApi";

export const Store = configureStore({
    reducer:{
        [libApi.reducerPath]:libApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [authApi.reducerPath]:authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([libApi.middleware],[userApi.middleware],[authApi.middleware]),
})