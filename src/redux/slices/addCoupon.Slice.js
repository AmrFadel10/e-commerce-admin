import { createSlice } from "@reduxjs/toolkit";
import {
	addCouponApicall,
	deleteCouponApicall,
	getCouponApicall,
	updateCouponApicall,
} from "../apicalls/addCoupon.ApiCall";
import toast from "react-hot-toast";

const addCouponSlice = createSlice({
	name: "add-coupon",
	initialState: {
		isLoading: false,
		isError: false,
		message: "",
		isSuccess: false,
		coupon: null,
		isUpdateSuccess: false,
	},
	reducers: {
		addCouponReset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.message = "";
			state.isSuccess = false;
			state.isUpdateSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addCouponApicall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "Request is being processed...";
			})
			.addCase(addCouponApicall.fulfilled, (state, action) => {
				state.coupon = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.message = "The coupon has been created successfully";
				toast.success(state.message);
			})
			.addCase(addCouponApicall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(updateCouponApicall.pending, (state) => {
				state.isLoading = true;
				state.message = "Request is being processed...";
			})
			.addCase(updateCouponApicall.fulfilled, (state, action) => {
				state.coupon = action.payload;
				state.isLoading = false;
				state.isUpdateSuccess = true;
				state.message = "The coupon has been updated successfully";
				toast.success(state.message);
			})
			.addCase(updateCouponApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(deleteCouponApicall.pending, (state) => {
				state.isLoading = true;
				state.message = "Request is being processed...";
			})
			.addCase(deleteCouponApicall.fulfilled, (state, action) => {
				state.coupon = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
				state.message = "The coupon has been updated successfully";
				toast.success(state.message);
			})
			.addCase(deleteCouponApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(getCouponApicall.pending, (state) => {
				state.isLoading = true;
				state.message = "Request is being processed...";
			})
			.addCase(getCouponApicall.fulfilled, (state, action) => {
				state.coupon = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
				state.message = "";
			})
			.addCase(getCouponApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});
export const { addCouponReset } = addCouponSlice.actions;
export default addCouponSlice.reducer;
