import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const colorsApiCall = createAsyncThunk(
	"color/get-colors",
	async (_, thunkAPI) => {
		try {
			const { data } = await request.get("v2/color/");
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
