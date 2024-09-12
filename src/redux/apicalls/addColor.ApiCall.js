import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addColorApicall = createAsyncThunk(
  "add-color/add",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.post("v2/color/create", arg[0], {
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

export const updateColorApicall = createAsyncThunk(
  "add-color/update",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.put(`v2/color/${arg.id}`, arg.info, {
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
export const getColorApicall = createAsyncThunk(
  "add-color/get",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.get(`v2/color/${arg.id}`, {
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
export const deleteColorApicall = createAsyncThunk(
  "add-color/delete",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.delete(`v2/color/${arg.id}`, {
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
