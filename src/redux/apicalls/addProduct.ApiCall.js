import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addProductApicall = createAsyncThunk(
	"add-product/add",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.post("v2/product/create", arg.formData, {
				headers: {
					Authorization: "bearer " + arg.token,
				},
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
