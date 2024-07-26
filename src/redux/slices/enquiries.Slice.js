import { createSlice } from "@reduxjs/toolkit";
import {
	deleteEnquiryApicall,
	enquiriesApiCall,
	getEnquiryApicall,
	updateEnquiryApicall,
} from "../apicalls/enquiries.ApiCall";

import toast from "react-hot-toast";

const initialState = {
	enquiries: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
	enquiry: null,
	isUpdatedSuccess: false,
	isDeletedSuccess: false,
};
const enquirieslice = createSlice({
	name: "enquiry",
	initialState,
	reducers: {
		resetEnquiry: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
			state.isError = false;
			state.isUpdatedSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(enquiriesApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(enquiriesApiCall.fulfilled, (state, action) => {
				state.enquiries = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(enquiriesApiCall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				// console.log(action);
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(updateEnquiryApicall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "Request is being processed...";
			})
			.addCase(updateEnquiryApicall.fulfilled, (state, action) => {
				state.enquiry = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isUpdatedSuccess = true;
				state.message = "The enquiry has been updated successfully";
				toast.success(state.message);
			})
			.addCase(updateEnquiryApicall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(getEnquiryApicall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(getEnquiryApicall.fulfilled, (state, action) => {
				state.enquiry = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.message = "";
			})
			.addCase(getEnquiryApicall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(deleteEnquiryApicall.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteEnquiryApicall.fulfilled, (state, action) => {
				state.enquiry = action.payload;
				state.isLoading = false;
				state.isDeletedSuccess = true;
				state.message = "Enquiry has been deleted Successfully!";
				toast.success(state.message);
			})
			.addCase(deleteEnquiryApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});

export const { resetEnquiry } = enquirieslice.actions;

export default enquirieslice.reducer;
