import { createSlice } from "@reduxjs/toolkit";
import { productsApiCall } from "../apicalls/products.ApiCall";
import toast from "react-hot-toast";
const initialState = {
	products: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};
const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(productsApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(productsApiCall.fulfilled, (state, action) => {
				state.products = action.payload;
				state.message = "Product created successfully!";
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(productsApiCall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default productSlice.reducer;
