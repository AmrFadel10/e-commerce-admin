import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const blogCategoriesApiCall = createAsyncThunk(
	"blogCategories/get-blogCategories",
	async (_, thunkAPI) => {
		try {
			const { data } = await request.get("v2/blogCategory/");
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
