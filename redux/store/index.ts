import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "@redux/slices/searchSlice";
import uiReducer from "@redux/slices/uiSlice";
import userReducer from "@redux/slices/userSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        search: searchReducer,
        ui: uiReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
