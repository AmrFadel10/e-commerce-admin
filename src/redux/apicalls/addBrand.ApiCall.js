import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addBrandApicall = createAsyncThunk(
	"add-brand/add",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.post("v2/brand/create", arg[0], {
				headers: {
					Authorization: "bearer " + arg[1],
				},
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const updateBrandApicall = createAsyncThunk(
	"add-brand/edit",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.put(`v2/brand/${arg[2]}`, arg[0], {
				headers: {
					Authorization: "bearer " + arg[1],
				},
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
export const deleteBrandApicall = createAsyncThunk(
	"add-brand/delete",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.delete(`v2/brand/${arg.id.toString()}`, {
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

export const getBrandApicall = createAsyncThunk(
	"add-brand/get",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get(`v2/brand/${arg[1]}`, {
				headers: {
					Authorization: "bearer " + arg[0],
				},
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);
