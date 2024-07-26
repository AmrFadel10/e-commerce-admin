import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const customersApiCall = createAsyncThunk(
	"customers/get-customers",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get("v2/user/get-users", {
				headers: { Authorization: "bearer " + arg },
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
