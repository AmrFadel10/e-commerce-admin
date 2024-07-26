import { createSlice } from "@reduxjs/toolkit";
import { blogCategoriesApiCall } from "../apicalls/blogCategories.ApiCall";
import toast from "react-hot-toast";

const initialState = {
	blogCategories: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};
const blogCategorieslice = createSlice({
	name: "blogCategories",
	initialState,
	reducers: {
		resetBlogCategory: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(blogCategoriesApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(blogCategoriesApiCall.fulfilled, (state, action) => {
				state.blogCategories = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(blogCategoriesApiCall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});
export const { resetBlogCategory } = blogCategorieslice.actions;

export default blogCategorieslice.reducer;
