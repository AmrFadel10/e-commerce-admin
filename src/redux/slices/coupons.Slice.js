import { createSlice } from "@reduxjs/toolkit";
import { couponsApiCall } from "../apicalls/coupons.ApiCall";

const initialState = {
	coupons: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};
const couponSlice = createSlice({
	name: "coupon",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(couponsApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(couponsApiCall.fulfilled, (state, action) => {
				state.coupons = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(couponsApiCall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default couponSlice.reducer;
