import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogsApiCall } from "../redux/apicalls/blogs.ApiCall";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { resetAddBlog } from "../redux/slices/addBlog.Slice";
import { deleteBlogApicall } from "../redux/apicalls/addBlog.ApiCall";

export default function BlogsList() {
  const dispatch = useDispatch();
  const {
    blog,
    isSuccess: success,
    isUpdateSuccess,
  } = useSelector((state) => state.addBlog);
  const { blogs, isError, isSuccess, message } = useSelector(
    (state) => state.blogs
  );
  const { token } = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState({});
  const [updatedBlogs, setUpdatedBlogs] = useState(blogs);

  useEffect(() => {
    dispatch(blogsApiCall());
    if (isError) {
      toast.error(message);
    }
  }, []);

  useEffect(() => {
    setUpdatedBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    dispatch(resetAddBlog());
  }, [isSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (success) {
      dispatch(resetAddBlog());
      const arr = blogs.filter((item) => {
        return item._id !== deleteBlog?.id;
      });
      setUpdatedBlogs(arr);
      dispatch(blogsApiCall());
    }
  }, [success]);
  return (
    <>
      <h2 className="title mb-12">Blogs</h2>

      <table className="w-full bg-white rounded-lg">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="py-2 px-4">SNO</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y text-gray-500 font-normal">
          {updatedBlogs?.slice(0, 10).map((item, index) => (
            <tr key={index} className="text-sm font-semibold text-gray-500 ">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{item.title}</td>
              <td className="py-2 px-4">{item.category}</td>
              <td className="py-2 px-4 flex gap-1">
                <FaRegEdit
                  size={22}
                  color={`${"rgb(22,163,74)"}`}
                  className="cursor-pointer"
                  onClick={() => navigate("/admin/add-blog/" + item._id)}
                />
                <AiOutlineDelete
                  size={22}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => {
                    setToggleModal(true);
                    setDeleteBlog({
                      id: item._id,
                      data: {
                        title: item.title,
                        description: item.description,
                        category: item.category,
                      },
                      index,
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {toggleModal && (
        <div className="h-screen w-full bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center">
          <div className="bg-gray-50 rounded-lg shadow p-6 relative w-1/3">
            <h2 className="mb-4 font-medium">
              Delete {deleteBlogCategory?.title} blogCategory
            </h2>
            <p className="text-gray-500 text-sm">
              Are you sure you want to delete this{" "}
              {deleteBlogCategory?.title + " "}
              blogCategory
            </p>
            <span
              className="absolute top-1 right-2 p-2 rounded-full text-gray-400 hover:text-gray-500 cursor-pointer text-xl"
              onClick={() => setToggleModal(false)}
            >
              x
            </span>

            <div className="flex gap-4 justify-end mt-6">
              <span
                className="inline-block px-4 py-1 border cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() => setToggleModal(false)}
              >
                Cancel
              </span>
              <span
                className="inline-block px-4 py-1 border bg-slate-800 rounded-md text-gray-50 cursor-pointer hover:bg-slate-900"
                onClick={() => {
                  const info = { token, id: deleteBlog.id };
                  dispatch(deleteBlogApicall(info));
                  setToggleModal(false);
                }}
              >
                Ok
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
