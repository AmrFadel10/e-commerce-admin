import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addBlogCategoryApicall = createAsyncThunk(
	"add-blogCategory/add",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.post("v2/blogCategory/create", arg[0], {
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

export const updateBlogCategoryApicall = createAsyncThunk(
	"add-blogCategory/edit",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.put(`v2/blogCategory/${arg[2]}`, arg[0], {
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
export const deleteBlogCategoryApicall = createAsyncThunk(
	"add-blogCategory/delete",
	async (arg, thunkAPI) => {
		console.log(arg);
		try {
			const { data } = await request.delete(
				`v2/blogCategory/${arg.id.toString()}`,
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

export const getBlogCategoryApicall = createAsyncThunk(
	"add-blogCategory/get",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get(`v2/blogCategory/${arg[1]}`, {
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
