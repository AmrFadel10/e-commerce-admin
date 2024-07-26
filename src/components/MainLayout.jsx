import { RiMenu2Fill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowUp, IoMdNotifications } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuLayers } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { SiBrandfolder } from "react-icons/si";
import { MdOutlineFormatColorFill } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { CgNotes } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { RiCouponLine } from "react-icons/ri";

export default function MainLayout() {
	const [togglecatalog, settoggleCatalog] = useState(false);
	const [togglecoupons, settoggleCoupons] = useState(false);
	const [toggleblog, settoggleBlog] = useState(false);
	const [toggleHeader, settoggleHeader] = useState(false);
	return (
		<section className="flex">
			<aside className="h-full w-[15%] bg-slate-800 fixed ">
				<div className="relative bg-yellow-500 p-4 ">
					<h2 className="text-4xl font-extrabold uppercase">MORA. </h2>
					<span className="absolute top-1/2 right-7 -translate-y-1/2 bg-slate-50 py-1 px-5 rounded-md font-bold text-sm">
						Admin
					</span>
				</div>
				<ul className="p-6 flex flex-col gap-4 text-slate-50 text-lg">
					<h4 className="text-sm font-normal uppercase text-gray-400">
						Applications
					</h4>
					<NavLink
						to={"/admin"}
						className={"flex gap-2 items-start font-normal"}
					>
						<AiOutlineDashboard className="text-2xl" />
						Dashboard
					</NavLink>
					<NavLink
						to={"/admin/users"}
						className={"flex gap-2 items-start font-normal"}
					>
						<FaUsers className="text-2xl" />
						Customers
					</NavLink>
					<li
						className="flex gap-2 items-center font-normal relative cursor-pointer"
						onClick={() => settoggleCatalog((pre) => !pre)}
					>
						{!togglecatalog ? (
							<IoIosArrowDown className="top-0 right-3 absolute translate-y-1/2  text-gray-400" />
						) : (
							<IoIosArrowUp className="top-0 right-3 absolute translate-y-1/2  text-gray-400" />
						)}
						<LuLayers className="text-xl" />
						Catalog
					</li>
					<ul
						className={`flex gap-3  cursor-pointer flex-col  ${
							togglecatalog ? "block" : "hidden"
						}`}
					>
						<NavLink
							to={"/admin/products"}
							className={`pl-7 transition-all font-normal  flex gap-3 items-start`}
						>
							<FiShoppingCart className="text-xl" />
							Product List
						</NavLink>
						<NavLink
							to={"/admin/add-product"}
							className={`pl-7 transition-all font-normal flex gap-3 items-start`}
						>
							<FiShoppingCart className="text-xl" />
							Add product
						</NavLink>
						<NavLink
							to={"/admin/categories"}
							className={`pl-7 transition-all font-normal flex gap-3 items-center`}
						>
							<BiCategory className="text-xl" />
							Categories
						</NavLink>
						<NavLink
							to={"/admin/add-category"}
							className={`pl-7 transition-all font-normal flex gap-3 items-center`}
						>
							<BiCategory className="text-xl" />
							Add category
						</NavLink>
						<NavLink
							to={"/admin/brands"}
							className={`pl-7 transition-all font-normal flex gap-3 items-center`}
						>
							<SiBrandfolder className="text-xl" />
							Brand List
						</NavLink>
						<NavLink
							to={"/admin/add-brand"}
							className={`pl-7 transition-all font-normal flex gap-3 items-center`}
						>
							<SiBrandfolder className="text-xl" />
							Brand
						</NavLink>
						<NavLink
							to={"/admin/colors"}
							className={`pl-7 transition-all font-normal flex gap-3 items-start`}
						>
							<MdOutlineFormatColorFill className="text-xl" />
							Colors List
						</NavLink>
						<NavLink
							to={"/admin/add-color"}
							className={`pl-7 transition-all font-normal flex gap-3 items-start`}
						>
							<MdOutlineFormatColorFill className="text-xl" />
							Add color
						</NavLink>
					</ul>
					<li
						className="flex gap-2 items-center font-normal relative cursor-pointer"
						onClick={() => settoggleCoupons((pre) => !pre)}
					>
						{!togglecoupons ? (
							<IoIosArrowDown className="top-0 right-3 absolute translate-y-1/2  text-gray-400" />
						) : (
							<IoIosArrowUp className="top-0 right-3 absolute translate-y-1/2  text-gray-400" />
						)}
						<LuLayers className="text-xl" />
						Coupons
					</li>
					<ul
						className={`flex gap-3  cursor-pointer flex-col  ${
							togglecoupons ? "block" : "hidden"
						}`}
					>
						<NavLink
							to={"/admin/coupons"}
							className={`pl-7 transition-all font-normal  flex gap-3 items-start`}
						>
							<RiCouponLine className="text-xl" />
							Coupon List
						</NavLink>
						<NavLink
							to={"/admin/add-coupon"}
							className={`pl-7 transition-all font-normal flex gap-3 items-start`}
						>
							<RiCouponLine className="text-xl" />
							Add coupon
						</NavLink>
					</ul>
					<NavLink
						to={"/admin/orders"}
						className={"flex gap-2 items-start font-normal"}
					>
						<CgNotes className="text-2xl" />
						Orders
					</NavLink>
					<li
						className="flex gap-2 items-center font-normal relative cursor-pointer"
						onClick={() => settoggleBlog((pre) => !pre)}
					>
						{!toggleblog ? (
							<IoIosArrowDown className="top-0 right-3 absolute translate-y-1/2  text-gray-400" />
						) : (
							<IoIosArrowUp className="top-0 right-3 absolute translate-y-1/2  text-gray-400" />
						)}
						<FaBloggerB className="text-xl" />
						blogs
					</li>
					<ul
						className={`flex gap-3  cursor-pointer flex-col  ${
							toggleblog ? "block" : "hidden"
						}`}
					>
						<NavLink
							to={"/admin/add-blog"}
							className={`pl-7 transition-all font-normal  flex gap-3 items-start`}
						>
							<ImBlog className="text-xl" />
							Add blog
						</NavLink>
						<NavLink
							to={"/admin/blogs"}
							className={`pl-7 transition-all font-normal flex gap-3 items-start`}
						>
							<FaBloggerB className="text-xl" />
							Blogs list
						</NavLink>
						<NavLink
							to={"/admin/add-blog-category"}
							className={`pl-7 transition-all font-normal flex gap-3 items-center`}
						>
							<ImBlog className="text-xl" />
							Add blog category
						</NavLink>
						<NavLink
							to={"/admin/blog-category-list"}
							className={`pl-7 transition-all font-normal flex gap-3 items-center`}
						>
							<FaBloggerB className="text-xl" />
							Blog category list
						</NavLink>
					</ul>
					<NavLink
						to={"/admin/equiries"}
						className={"flex gap-2 items-start font-normal"}
					>
						<CgNotes className="text-2xl" />
						Equiries
					</NavLink>
				</ul>
			</aside>
			<main className="ml-[15%] w-[85%] min-h-screen flex flex-col">
				<header className="shadow w-full  flex justify-between h-[73px] sticky top-0 right-0 bg-white">
					<div className="flex items-center gap-8 px-6 ">
						<span className="cursor-pointer">
							<RiMenu2Fill className="text-3xl" />
						</span>
						<div className="text-gray-600 relative ">
							<IoSearch className="right-4 top-1/2 -translate-y-1/2 absolute text-2xl font-semibold bg-gray-100" />
							<input
								placeholder={"Search ..."}
								type={"search"}
								id={"search"}
								className={` my-2 pr-5 p-2 bg-gray-100 text-gray-600 focus:outline-none  rounded-md border-gray-300 min-w-[400px]`}
								name={"search"}
							/>
						</div>
					</div>
					<div className="flex items-center gap-8 p-0">
						<span className="cursor-pointer">
							<IoMdNotifications className="text-2xl" />
						</span>
						<div className="relative">
							<div
								className="flex gap-3 cursor-pointer hover:bg-gray-300 px-6 py-2"
								onClick={() => settoggleHeader((pre) => !pre)}
							>
								<img
									src="assets/images/pexels-simon-robben-614810.jpg"
									alt=""
									className="w-12 h-10 rounded-sm"
								/>
								<div>
									<p className="font-semibold ">Mora mohamed fadel</p>
									<p className="text-sm text-gray-400">Email@gmail.com</p>
								</div>
								<ul
									className={`absolute top-[60px] right-0  shadow bg-white  w-52 rounded-md ${
										!toggleHeader ? "hidden" : "block"
									}`}
								>
									<Link
										to={"/admin"}
										className="hover:bg-gray-50 p-2  cursor-pointer block"
									>
										index
									</Link>
									<Link
										to={"#"}
										className="hover:bg-gray-50 p-2  cursor-pointer block"
									>
										Profile
									</Link>
									<Link
										to={"/admin"}
										className="hover:bg-gray-50 p-2  cursor-pointer block"
									>
										Setting
									</Link>
									<li className="hover:bg-gray-50 p-2 cursor-pointer border-t">
										Sign out
									</li>
								</ul>
							</div>
						</div>
					</div>
				</header>
				<div className="w-full min-h-full  p-8 overflow-y-auto bg-gray-50">
					<Outlet />
				</div>
			</main>
		</section>
	);
}
