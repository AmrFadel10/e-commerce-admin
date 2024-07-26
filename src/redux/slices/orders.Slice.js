import { createSlice } from "@reduxjs/toolkit";
import {
	deleteOrderApicall,
	getOrderByUserIdApicall,
	ordersApiCall,
	updateOrderApicall,
} from "../apicalls/orders.ApiCall";
import toast from "react-hot-toast";

const initialState = {
	orders: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
	order: null,
};
const orderslice = createSlice({
	name: "order",
	initialState,
	reducers: {
		resetOrder: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
			state.isError = false;
			state.isUpdatedSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(ordersApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(ordersApiCall.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(ordersApiCall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				// console.log(action);
				state.message = action.payload;
			})
			.addCase(updateOrderApicall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "Request is being processed...";
			})
			.addCase(updateOrderApicall.fulfilled, (state, action) => {
				state.order = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isUpdatedSuccess = true;
				state.message = "The order has been updated successfully";
				toast.success(state.message);
			})
			.addCase(updateOrderApicall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(getOrderByUserIdApicall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(getOrderByUserIdApicall.fulfilled, (state, action) => {
				state.order = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
				state.message = "";
			})
			.addCase(getOrderByUserIdApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(deleteOrderApicall.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteOrderApicall.fulfilled, (state, action) => {
				state.order = action.payload;
				state.isLoading = false;
				state.isDeletedSuccess = true;
				state.message = "Order has been deleted Successfully!";
				toast.success(state.message);
			})
			.addCase(deleteOrderApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});

export default orderslice.reducer;
