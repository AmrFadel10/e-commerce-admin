import request from "../../utils/axios/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCouponApicall = createAsyncThunk(
  "add-coupon/add",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.post("v2/coupon/create", arg[0], {
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

export const updateCouponApicall = createAsyncThunk(
  "add-coupon/update",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.put(`v2/coupon/${arg.id}`, arg.info, {
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

export const getCouponApicall = createAsyncThunk(
  "add-coupon/get",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.get(`v2/coupon/${arg.id}`, {
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
export const deleteCouponApicall = createAsyncThunk(
  "add-coupon/delete",
  async (arg, thunkAPI) => {
    try {
      const { data } = await request.delete(`v2/coupon/${arg.id}`, {
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
