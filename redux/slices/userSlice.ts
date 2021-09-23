import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceIinitialState {
    id: string | null;
    email: string | null;
}

const initialState: UserSliceIinitialState = {
    id: null,
    email: null,
};

export const uiSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string | null; email: string | null }>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        },
    },
});

export const { setUser } = uiSlice.actions;
export default uiSlice.reducer;
