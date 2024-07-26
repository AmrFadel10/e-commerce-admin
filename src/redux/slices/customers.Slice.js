import { createSlice } from "@reduxjs/toolkit";
import { customersApiCall } from "../apicalls/customers.ApiCall";

const customersSlice = createSlice({
	name: "customers",
	initialState: {
		customers: null,
		isLoading: false,
		isError: false,
		message: "",
		isSuccess: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(customersApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(customersApiCall.fulfilled, (state, action) => {
				state.customers = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(customersApiCall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default customersSlice.reducer;
