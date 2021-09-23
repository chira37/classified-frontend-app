import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchSliceIinitialState {
    extras: { [key: string]: string[] };
    searchText: string;
    province: string;
    city: string[];
    category: string;
    condition: string;
    sortBy: string;
    page: number;
    priceFrom: string;
    priceTo: string;
}

const initialState: SearchSliceIinitialState = {
    extras: {},
    searchText: "",
    province: "",
    city: [],
    category: "",
    condition: "",
    sortBy: "",
    page: 1,
    priceFrom: "",
    priceTo: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setExtras: (state, action: PayloadAction<{ [key: string]: string[] }>) => {
            state.extras = { ...state.extras, ...action.payload };
        },

        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },

        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },

        setProvince: (state, action: PayloadAction<string>) => {
            state.province = action.payload; // reset the cities
            state.city = [];
        },

        setCity: (state, action: PayloadAction<Array<string>>) => {
            state.city = action.payload;
        },

        setPriceFrom: (state, action: PayloadAction<string>) => {
            state.priceFrom = action.payload;
        },
        setPriceTo: (state, action: PayloadAction<string>) => {
            state.priceTo = action.payload;
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        setSearchState: (state, action: PayloadAction<SearchSliceIinitialState>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const {
    setExtras,
    setPriceFrom,
    setPriceTo,
    setSearchText,
    setSearchState,
    setCategory,
    setProvince,
    setCity,
    setPage,
} = searchSlice.actions;
export default searchSlice.reducer;
