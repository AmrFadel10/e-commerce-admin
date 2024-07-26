import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCategoryApicall = createAsyncThunk(
	"add-category/add",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.post("v2/category/create", arg[0], {
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

export const updateCategoryApicall = createAsyncThunk(
	"add-category/edit",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.put(`v2/category/${arg[2]}`, arg[0], {
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
export const deleteCategoryApicall = createAsyncThunk(
	"add-category/delete",
	async (arg, thunkAPI) => {
		console.log(arg);
		try {
			const { data } = await request.delete(
				`v2/category/${arg.id.toString()}`,
				{
					headers: {
						Authorization: "bearer " + arg.token,
					},
				}
			);
			console.log(data);
			return data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const getCategoryApicall = createAsyncThunk(
	"add-category/get",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get(`v2/category/${arg[1]}`, {
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
