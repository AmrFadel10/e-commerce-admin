import { createSlice } from "@reduxjs/toolkit";
import { colorsApiCall } from "../apicalls/colors.ApiCall";
import toast from "react-hot-toast";

const initialState = {
	colors: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};
const colorSlice = createSlice({
	name: "color",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(colorsApiCall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(colorsApiCall.fulfilled, (state, action) => {
				state.colors = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(colorsApiCall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(state.message);
			});
	},
});

export default colorSlice.reducer;
