import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addBlogApicall = createAsyncThunk(
	"add-blog/add",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.post("v2/blog/create", arg[0], {
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

export const updateBlogApicall = createAsyncThunk(
	"add-blog/edit",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.put(`v2/blog/${arg[2]}`, arg[0], {
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
export const deleteBlogApicall = createAsyncThunk(
	"add-blog/delete",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.delete(`v2/blog/${arg.id.toString()}`, {
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

export const getBlogApicall = createAsyncThunk(
	"add-blog/get",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get(`v2/blog/${arg[1]}`, {
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
