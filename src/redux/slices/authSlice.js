import { createSlice } from "@reduxjs/toolkit";
import { loginApicall } from "../apicalls/authApiCall";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoading: false,
		isError: false,
		message: "",
		isSuccess: false,
		user: localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user"))
			: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginApicall.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(loginApicall.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.message = "The account logged in isSuccessfully";
			})
			.addCase(loginApicall.rejected, (state, action) => {
				state.isSuccess = false;
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default authSlice.reducer;
