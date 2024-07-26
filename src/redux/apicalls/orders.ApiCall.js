import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const ordersApiCall = createAsyncThunk(
	"order/get-orders",
	async (token, thunkAPI) => {
		try {
			const { data } = await request.get("v2/order/all", {
				headers: { Authorization: `bearer ${token}` },
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const updateOrderApicall = createAsyncThunk(
	"order/edit",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.put(`v2/order/${arg[2]}`, arg[0], {
				headers: {
					Authorization: "bearer " + arg[1],
				},
			});
			console.log(data);
			return data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const deleteOrderApicall = createAsyncThunk(
	"order/delete",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.delete(`v2/order/${arg.id.toString()}`, {
				headers: {
					Authorization: "bearer " + arg.token,
				},
			});
			return data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const getOrderByUserIdApicall = createAsyncThunk(
	"order/get-one",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get(
				`v2/order/get-order-by-user-id/${arg[1]}`,
				{
					headers: {
						Authorization: "bearer " + arg[0],
					},
				}
			);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
