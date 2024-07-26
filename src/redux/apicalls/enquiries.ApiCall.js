import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/axios/axios";

export const enquiriesApiCall = createAsyncThunk(
	"enquiry/get-enquiries",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get("v2/enquiry/", {
				headers: { Authorization: "bearer " + arg },
			});
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const updateEnquiryApicall = createAsyncThunk(
	"enquiry/edit",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.put(`v2/enquiry/${arg[2]}`, arg[0], {
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
export const deleteEnquiryApicall = createAsyncThunk(
	"enquiry/delete",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.delete(`v2/enquiry/${arg.id.toString()}`, {
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

export const getEnquiryApicall = createAsyncThunk(
	"enquiry/get-one",
	async (arg, thunkAPI) => {
		try {
			const { data } = await request.get(`v2/enquiry/${arg[1]}`, {
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
