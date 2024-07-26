import { createAction, createSlice } from "@reduxjs/toolkit";
import { brandsApiCall } from "../apicalls/brands.ApiCall";
import toast from "react-hot-toast";

const initialState = {
	brands: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

const brandslice = createSlice({
	name: "brands",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(brandsApiCall.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(brandsApiCall.fulfilled, (state, action) => {
				state.brands = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(brandsApiCall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});

export default brandslice.reducer;
