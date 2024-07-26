import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getMaterial: false,
    getMC: false,
};
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setGetMaterial: (state, action) => {
            state.getMaterial = action.payload;
        },
        setGetMC: (state, action) => {
            state.getMC = action.payload;
        },
    },
});
export const { setGetMaterial, setGetMC } = adminSlice.actions;
export default adminSlice.reducer;
