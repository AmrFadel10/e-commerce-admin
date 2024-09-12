import { createSlice } from "@reduxjs/toolkit";
import {
  addBlogCategoryApicall,
  deleteBlogCategoryApicall,
  getBlogCategoryApicall,
  updateBlogCategoryApicall,
} from "../apicalls/addBlogCategory.ApiCall";
import toast from "react-hot-toast";

const addBlogCategorySlice = createSlice({
  name: "add-blogCategory",
  initialState: {
    isLoading: false,
    isError: false,
    message: "",
    isSuccess: false,
    blogCategory: null,
    isUpdateSuccess: false,
  },
  reducers: {
    resetAddBlogCategory: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.isError = false;
      state.isUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBlogCategoryApicall.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Request is being processed...";
      })
      .addCase(addBlogCategoryApicall.fulfilled, (state, action) => {
        state.blogCategory = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "The blogCategory has been created successfully";
        toast.success(state.message);
      })
      .addCase(addBlogCategoryApicall.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(updateBlogCategoryApicall.pending, (state) => {
        state.isLoading = true;
        state.message = "Request is being processed...";
      })
      .addCase(updateBlogCategoryApicall.fulfilled, (state, action) => {
        state.blogCategory = action.payload;
        (state.isUpdateSuccess = true),
          (state.message = "The blogCategory has been updated successfully");
        toast.success(state.message);
      })
      .addCase(updateBlogCategoryApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getBlogCategoryApicall.pending, (state) => {
        state.isLoading = true;
        state.message = "Request is being processed...";
      })
      .addCase(getBlogCategoryApicall.fulfilled, (state, action) => {
        state.blogCategory = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(getBlogCategoryApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteBlogCategoryApicall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategoryApicall.fulfilled, (state, action) => {
        state.blogCategory = action.payload;
        state.isSuccess = true;
        state.message = "BlogCategory has been deleted Successfully!";
        toast.success(state.message);
      })
      .addCase(deleteBlogCategoryApicall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      });
  },
});
export const { resetAddBlogCategory } = addBlogCategorySlice.actions;
export default addBlogCategorySlice.reducer;
