import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
    filterValuesObject: Object | null,
    searchText: string,
    category: string,
    sort: string,
    page: string
}

const initialState:IinitialState = {
    filterValuesObject: null,
    searchText: "",
    category: "",
    sort: "",
    page: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        search: (state, action: PayloadAction<object>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { search } = searchSlice.actions;
export default searchSlice.reducer;
