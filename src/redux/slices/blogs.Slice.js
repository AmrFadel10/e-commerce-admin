import { createSlice } from "@reduxjs/toolkit";
import { blogsApiCall } from "../apicalls/blogs.ApiCall";

const initialState = {
	blogs: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};
const blogslice = createSlice({
	name: "blogs",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(blogsApiCall.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(blogsApiCall.fulfilled, (state, action) => {
				state.blogs = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(blogsApiCall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default blogslice.reducer;
