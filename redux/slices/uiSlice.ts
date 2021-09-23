import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiSliceIinitialState {
    drawer: boolean;
    filter: boolean;
}

const initialState: UiSliceIinitialState = {
    drawer: false,
    filter: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.drawer = !state.drawer;
        },

        toggleFilter: (state) => {
            state.filter = !state.filter;
        },
    },
});

export const { toggleDrawer, toggleFilter } = uiSlice.actions;
export default uiSlice.reducer;
