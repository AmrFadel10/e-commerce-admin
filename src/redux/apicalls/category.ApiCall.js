import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const categoryApiCall = createAsyncThunk(
	"category/get-category",
	async (_, thunkAPI) => {
		try {
			const { data } = await request.get("v2/category/");
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
