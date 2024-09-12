import { createSlice } from "@reduxjs/toolkit";
import {
  addBlogApicall,
  deleteBlogApicall,
  getBlogApicall,
  updateBlogApicall,
} from "../apicalls/addBlog.ApiCall";
import toast from "react-hot-toast";

const addBlogSlice = createSlice({
  name: "add-blog",
  initialState: {
    isLoading: false,
    isError: false,
    message: "",
    isSuccess: false,
    blog: null,
    isUpdateSuccess: false,
  },
  reducers: {
    resetAddBlog: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.isError = false;
      state.isUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBlogApicall.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Request is being processed...";
      })
      .addCase(addBlogApicall.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "The blog has been created successfully";
        toast.success(state.message);
      })
      .addCase(addBlogApicall.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(updateBlogApicall.pending, (state) => {
        state.isLoading = true;
        state.message = "Request is being processed...";
      })
      .addCase(updateBlogApicall.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isUpdateSuccess = true;
        state.message = "The blog has been updated successfully";
        toast.success(state.message);
      })
      .addCase(updateBlogApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getBlogApicall.pending, (state) => {
        state.isLoading = true;
        state.message = "Request is being processed...";
      })
      .addCase(getBlogApicall.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(getBlogApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteBlogApicall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogApicall.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isSuccess = true;
        state.message = "Blog has been deleted Successfully!";
        toast.success(state.message);
      })
      .addCase(deleteBlogApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      });
  },
});

export const { resetAddBlog } = addBlogSlice.actions;
export default addBlogSlice.reducer;
