import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import customersReducer from "./slices/customers.Slice.js";
import productsReducer from "./slices/products.Slice.js";
import blogsReducer from "./slices/blogs.Slice.js";
import brandsReducer from "./slices/brands.Slice.js";
import blogCategoriesReducer from "./slices/blogCategories.Slice.js";
import categoriesReducer from "./slices/category.Slice.js";
import colorsReducer from "./slices/colors.Slice.js";
import couponsReducer from "./slices/coupons.Slice.js";
import enquiriesReducer from "./slices/enquiries.Slice.js";
import ordersReducer from "./slices/orders.Slice.js";
import addProductReducer from "./slices/addProduct.Slice.js";
import addBrandReducer from "./slices/addBrand.Slice.js";
import addColorReducer from "./slices/addColor.Slice.js";
import addCouponReducer from "./slices/addCoupon.Slice.js";
import addCategoryReducer from "./slices/addCategory.Slice.js";
import addBlogReducer from "./slices/addBlog.Slice.js";
import addBlogCategoryReducer from "./slices/addBlogCategory.Slice.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		customers: customersReducer,
		products: productsReducer,
		blogs: blogsReducer,
		brands: brandsReducer,
		blogCategories: blogCategoriesReducer,
		categories: categoriesReducer,
		colors: colorsReducer,
		coupons: couponsReducer,
		enquiries: enquiriesReducer,
		orders: ordersReducer,
		addProduct: addProductReducer,
		addBrand: addBrandReducer,
		addColor: addColorReducer,
		addCoupon: addCouponReducer,
		addCategory: addCategoryReducer,
		addBlog: addBlogReducer,
		addBlogCategory: addBlogCategoryReducer,
	},
});

export default store;
