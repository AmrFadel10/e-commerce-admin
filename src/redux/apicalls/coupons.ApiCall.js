import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const couponsApiCall = createAsyncThunk(
	"coupon/get-coupons",
	async (arg, thunkAPI) => {
		try {
			const response = await request.get("v2/coupon/", {
				headers: { Authorization: "bearer " + arg },
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
