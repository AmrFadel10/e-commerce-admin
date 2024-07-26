import { createSlice } from "@reduxjs/toolkit";
import { addProductApicall } from "../apicalls/addProduct.ApiCall";
import toast from "react-hot-toast";

const addProductSlice = createSlice({
	name: "add-product",
	initialState: {
		isLoading: false,
		isError: false,
		message: "",
		isSuccess: false,
		product: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addProductApicall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "Request is being processed...";
			})
			.addCase(addProductApicall.fulfilled, (state, action) => {
				state.product = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.message = "The product has been created successfully";
				toast.success(state.message);
			})
			.addCase(addProductApicall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});

export default addProductSlice.reducer;
