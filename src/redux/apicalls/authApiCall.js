import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginApicall = createAsyncThunk(
	"auth/login",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.post("v2/auth/admin-login", arg);
			localStorage.setItem("user", JSON.stringify(data));
			return data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
