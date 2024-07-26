import { createSlice } from "@reduxjs/toolkit";
import {
	addColorApicall,
	deleteColorApicall,
	getColorApicall,
	updateColorApicall,
} from "../apicalls/addColor.ApiCall";
import toast from "react-hot-toast";

const addColorSlice = createSlice({
	name: "add-color",
	initialState: {
		isLoading: false,
		isError: false,
		message: "",
		isSuccess: false,
		isUpdateSuccess: false,
		color: null,
	},
	reducers: {
		addColorReset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.message = "";
			state.isSuccess = false;
			state.isUpdateSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addColorApicall.pending, (state) => {
				state.isLoading = true;
				state.message = "Request is being processed...";
			})
			.addCase(addColorApicall.fulfilled, (state, action) => {
				state.color = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
				state.message = "The color has been created successfully";
				toast.success(state.message);
			})
			.addCase(addColorApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(updateColorApicall.pending, (state) => {
				state.isLoading = true;
				state.message = "Request is being processed...";
			})
			.addCase(updateColorApicall.fulfilled, (state, action) => {
				state.color = action.payload;
				state.isLoading = false;
				state.isUpdateSuccess = true;
				state.message = "The color has been updated successfully";
				toast.success(state.message);
			})
			.addCase(updateColorApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(deleteColorApicall.pending, (state) => {
				state.isLoading = true;
				state.message = "Request is being processed...";
			})
			.addCase(deleteColorApicall.fulfilled, (state, action) => {
				state.color = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
				state.message = "The color has been updated successfully";
				toast.success(state.message);
			})
			.addCase(deleteColorApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			})
			.addCase(getColorApicall.pending, (state) => {
				state.isLoading = true;
				state.message = "Request is being processed...";
			})
			.addCase(getColorApicall.fulfilled, (state, action) => {
				state.color = action.payload;
				state.isLoading = false;
				state.isSuccess = true;
				state.message = "";
			})
			.addCase(getColorApicall.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});
export const { addColorReset } = addColorSlice.actions;
export default addColorSlice.reducer;
