import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getMC: false,
};
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setGetMC: (state, action) => {
            state.getMC = action.payload;
        },
    },
});
export const { setGetMC } = adminSlice.actions;
export default adminSlice.reducer;
