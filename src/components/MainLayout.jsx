import { RiMenu2Fill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
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
import { useSelector } from "react-redux";

export default function MainLayout() {
  const [toggleHeader, settoggleHeader] = useState(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="flex">
      <aside className="h-full w-[15%] bg-slate-800 fixed">
        <div className="relative bg-slate-900 p-4 ">
          <h2 className="text-4xl font-extrabold uppercase text-slate-200">
            MORA.
          </h2>
        </div>
        <ul className="p-6 flex flex-col gap-4 text-slate-50 text-lg overflow-y-auto h-[750px]">
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

          <NavLink
            to={"/admin/products"}
            className={` transition-all font-normal  flex gap-3 items-start`}
          >
            <FiShoppingCart className="text-xl" />
            Product List
          </NavLink>
          <NavLink
            to={"/admin/add-product"}
            className={` transition-all font-normal flex gap-3 items-start`}
          >
            <FiShoppingCart className="text-xl" />
            Add product
          </NavLink>
          <NavLink
            to={"/admin/categories"}
            className={` transition-all font-normal flex gap-3 items-center`}
          >
            <BiCategory className="text-xl" />
            Categories
          </NavLink>
          <NavLink
            to={"/admin/add-category"}
            className={` transition-all font-normal flex gap-3 items-center`}
          >
            <BiCategory className="text-xl" />
            Add category
          </NavLink>
          <NavLink
            to={"/admin/brands"}
            className={` transition-all font-normal flex gap-3 items-center`}
          >
            <SiBrandfolder className="text-xl" />
            Brand List
          </NavLink>
          <NavLink
            to={"/admin/add-brand"}
            className={` transition-all font-normal flex gap-3 items-center`}
          >
            <SiBrandfolder className="text-xl" />
            Add brand
          </NavLink>
          <NavLink
            to={"/admin/colors"}
            className={` transition-all font-normal flex gap-3 items-start`}
          >
            <MdOutlineFormatColorFill className="text-xl" />
            Colors List
          </NavLink>
          <NavLink
            to={"/admin/add-color"}
            className={` transition-all font-normal flex gap-3 items-start`}
          >
            <MdOutlineFormatColorFill className="text-xl" />
            Add color
          </NavLink>

          <NavLink
            to={"/admin/coupons"}
            className={` transition-all font-normal  flex gap-3 items-start`}
          >
            <RiCouponLine className="text-xl" />
            Coupon List
          </NavLink>
          <NavLink
            to={"/admin/add-coupon"}
            className={` transition-all font-normal flex gap-3 items-start`}
          >
            <RiCouponLine className="text-xl" />
            Add coupon
          </NavLink>
          {/* </ul> */}
          <NavLink
            to={"/admin/orders"}
            className={"flex gap-2 items-start font-normal"}
          >
            <CgNotes className="text-2xl" />
            Orders
          </NavLink>

          <NavLink
            to={"/admin/add-blog"}
            className={` transition-all font-normal  flex gap-3 items-start`}
          >
            <ImBlog className="text-xl" />
            Add blog
          </NavLink>
          <NavLink
            to={"/admin/blogs"}
            className={` transition-all font-normal flex gap-3 items-start`}
          >
            <FaBloggerB className="text-xl" />
            Blogs list
          </NavLink>
          <NavLink
            to={"/admin/add-blog-category"}
            className={` transition-all font-normal flex gap-3 items-center`}
          >
            <ImBlog className="text-xl" />
            Add blog category
          </NavLink>
          <NavLink
            to={"/admin/blog-category-list"}
            className={` transition-all font-normal flex gap-3 items-center`}
          >
            <FaBloggerB className="text-xl" />
            Blog category list
          </NavLink>
          <NavLink
            to={"/admin/equiries"}
            className={"flex gap-2 items-start font-normal"}
          >
            <CgNotes className="text-2xl" />
            Equiries
          </NavLink>
        </ul>
      </aside>
      <main className=" ml-[15%] w-[85%] min-h-screen flex flex-col">
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
            <div className="relative">
              <div
                className="flex gap-3 cursor-pointer hover:bg-gray-300 px-6 py-2"
                onClick={() => settoggleHeader((pre) => !pre)}
              >
                <img
                  src={user?.admin?.avatar?.url}
                  alt=""
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <p className="font-semibold capitalize">
                    {user?.admin?.name}
                  </p>
                  <p className="text-sm text-gray-400">{user?.admin?.email}</p>
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
