import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const blogsApiCall = createAsyncThunk(
	"blogs/get-blogs",
	async (_, thunkAPI) => {
		try {
			const { data } = await request.get("v2/blog/");
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
