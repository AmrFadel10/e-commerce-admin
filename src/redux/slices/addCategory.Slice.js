import { createSlice } from "@reduxjs/toolkit";
import {
  addCategoryApicall,
  deleteCategoryApicall,
  getCategoryApicall,
  updateCategoryApicall,
} from "../apicalls/addCategory.ApiCall";
import toast from "react-hot-toast";

const addCategorySlice = createSlice({
  name: "add-category",
  initialState: {
    isLoading: false,
    isError: false,
    message: "",
    isSuccess: false,
    category: null,
    isUpdateSucces: false,
  },
  reducers: {
    resetAddCategory: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.isError = false;
      state.isUpdateSucces = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryApicall.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Request is being processed...";
      })
      .addCase(addCategoryApicall.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "The category has been created successfully";
        toast.success(state.message);
      })
      .addCase(addCategoryApicall.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(updateCategoryApicall.pending, (state) => {
        state.isLoading = true;
        state.message = "Request is being processed...";
      })
      .addCase(updateCategoryApicall.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isUpdateSucces = true;
        state.message = "The category has been updated successfully";
        toast.success(state.message);
      })
      .addCase(updateCategoryApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getCategoryApicall.pending, (state) => {
        state.isLoading = true;
        state.message = "Request is being processed...";
      })
      .addCase(getCategoryApicall.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(getCategoryApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteCategoryApicall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoryApicall.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isSuccess = true;
        state.message = "Category has been deleted Successfully!";
        toast.success(state.message);
      })
      .addCase(deleteCategoryApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      });
  },
});

export const { resetAddCategory } = addCategorySlice.actions;
export default addCategorySlice.reducer;
