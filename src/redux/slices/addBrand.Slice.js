import { createAction, createSlice } from "@reduxjs/toolkit";
import {
  addBrandApicall,
  deleteBrandApicall,
  getBrandApicall,
  updateBrandApicall,
} from "../apicalls/addBrand.ApiCall";
import toast from "react-hot-toast";

export const resetAddBrand = createAction("add-brand/reset-add-brand");

const addBrandSlice = createSlice({
  name: "add-brand",
  initialState: {
    isLoading: false,
    isError: false,
    message: "",
    isSuccess: false,
    isBrandUpdated: false,
    brand: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBrandApicall.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Request is being processed...";
      })
      .addCase(addBrandApicall.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "The brand has been created successfully";
        toast.success(state.message);
      })
      .addCase(addBrandApicall.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(updateBrandApicall.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isBrandUpdated = false;
        state.message = "Request is being processed...";
      })
      .addCase(updateBrandApicall.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isBrandUpdated = true;
        state.message = "The brand has been updated successfully";
        toast.success(state.message);
      })
      .addCase(updateBrandApicall.rejected, (state, action) => {
        state.isBrandUpdated = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getBrandApicall.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getBrandApicall.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(getBrandApicall.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteBrandApicall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrandApicall.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Brand has been deleted Successfully!";
        toast.success(state.message);
      })
      .addCase(deleteBrandApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(resetAddBrand, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isBrandUpdated = false;
        state.message = "";
        state.isError = false;
      });
  },
});

export default addBrandSlice.reducer;
