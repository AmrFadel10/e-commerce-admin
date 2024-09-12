import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { categoryApiCall } from "../redux/apicalls/category.ApiCall";
import { useNavigate } from "react-router-dom";
import { deleteCategoryApicall } from "../redux/apicalls/addCategory.ApiCall";
import { resetCategory } from "../redux/slices/category.Slice";
import { resetAddCategory } from "../redux/slices/addCategory.Slice";

export default function CategoriesList() {
  const dispatch = useDispatch();
  const { categories, isSuccess } = useSelector((state) => state.categories);
  const {
    category,
    isSuccess: success,
    isUpdateSucces,
    isLoading,
  } = useSelector((state) => state.addCategory);
  const { token } = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({});
  const [updatedCategories, setUpdatedCategories] = useState(categories);

  useEffect(() => {
    dispatch(categoryApiCall());
    dispatch(resetAddCategory());
  }, []);

  useEffect(() => {
    setUpdatedCategories(categories);
  }, [categories]);

  useEffect(() => {
    if ((success || isUpdateSucces) && !isLoading) {
      dispatch(resetAddCategory());
    }
  }, [success, isUpdateSucces]);

  useEffect(() => {
    if (success) {
      dispatch(resetAddCategory());
      const arr = categories?.filter((item) => {
        return item._id !== deleteCategory?.id;
      });
      setUpdatedCategories(arr);
      dispatch(categoryApiCall());
    }
  }, [success]);
  return (
    <>
      <h2 className="title mb-12">Categories</h2>
      <table className="w-full bg-white rounded-lg">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="py-2 px-4">SNO</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y text-gray-500 font-normal">
          {updatedCategories?.map((item, index) => (
            <tr key={index} className="text-sm font-semibold text-gray-500 ">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{item.title}</td>
              <td className="py-2 px-4 flex gap-1">
                <FaRegEdit
                  size={22}
                  color={`${"rgb(22,163,74)"}`}
                  className="cursor-pointer"
                  onClick={() => navigate("/admin/add-category/" + item._id)}
                />
                <AiOutlineDelete
                  size={22}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => {
                    setToggleModal(true);
                    setDeleteCategory({
                      id: item._id,
                      title: item.title,
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
              Delete {deleteCategory?.title} category
            </h2>
            <p className="text-gray-500 text-sm">
              Are you sure you want to delete this {deleteCategory?.title + " "}
              category
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
                  const info = { token, id: deleteCategory.id };
                  dispatch(deleteCategoryApicall(info));
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
