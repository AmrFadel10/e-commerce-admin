import { createSlice } from "@reduxjs/toolkit";
import { categoryApiCall } from "../apicalls/category.ApiCall";
import toast from "react-hot-toast";

const initialState = {
	categories: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};
const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		resetCategory: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(categoryApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(categoryApiCall.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(categoryApiCall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});
export const { resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
