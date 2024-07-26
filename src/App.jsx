import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import BrandList from "./pages/BrandList";
import CategoriesList from "./pages/CategoriesList";
import BlogsList from "./pages/BlogsList";
import BlogCategoryList from "./pages/BlogCategoryList";
import ProductsList from "./pages/ProductsList";
import AddBrand from "./pages/AddBrand";
import AddCategory from "./pages/AddCategory";
import AddColor from "./pages/AddColor";
import ColorsList from "./pages/ColorsList";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddBlog from "./pages/AddBlog";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Enquiries from "./pages/Enquiries";
import AddProduct from "./pages/AddProduct";
import { Toaster } from "react-hot-toast";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrder from "./pages/ViewOrder";

function App() {
	return (
		<>
			<BrowserRouter>
				<Toaster />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/admin" element={<MainLayout />}>
						<Route index element={<Dashboard />} />
						<Route path={"brands"} element={<BrandList />} />
						<Route path={"add-brand"} element={<AddBrand />} />
						<Route path={"add-brand/:id"} element={<AddBrand />} />
						<Route path={"colors"} element={<ColorsList />} />
						<Route path={"add-color"} element={<AddColor />} />
						<Route path={"add-color/:id"} element={<AddColor />} />
						<Route path={"coupons"} element={<CouponList />} />
						<Route path={"add-coupon"} element={<AddCoupon />} />
						<Route path={"add-coupon/:id"} element={<AddCoupon />} />
						<Route path={"categories"} element={<CategoriesList />} />
						<Route path={"add-category"} element={<AddCategory />} />
						<Route path={"add-category/:id"} element={<AddCategory />} />
						<Route path={"blog-category-list"} element={<BlogCategoryList />} />
						<Route path={"add-blog-category"} element={<AddBlogCategory />} />
						<Route
							path={"add-blog-category/:id"}
							element={<AddBlogCategory />}
						/>
						<Route path={"add-product"} element={<AddProduct />} />
						<Route path={"products"} element={<ProductsList />} />
						<Route path={"blogs"} element={<BlogsList />} />
						<Route path={"add-blog"} element={<AddBlog />} />
						<Route path={"add-blog/:id"} element={<AddBlog />} />
						<Route path={"users"} element={<Customers />} />
						<Route path={"orders"} element={<Orders />} />
						<Route path={"order/:id"} element={<ViewOrder />} />
						<Route path={"equiries"} element={<Enquiries />} />
						<Route path={"equiries/:id"} element={<ViewEnquiry />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
