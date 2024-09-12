import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryApicall,
  getCategoryApicall,
  updateCategoryApicall,
} from "../redux/apicalls/addCategory.ApiCall";
import { useEffect, useState } from "react";
import { CustomInput1 } from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { resetAddCategory } from "../redux/slices/addCategory.Slice";

export default function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { token } = useSelector((state) => state.auth.user);
  const { category, isUpdateSucces, isError, isLoading, isSuccess } =
    useSelector((state) => state.addCategory);

  const schema = z.object({
    title: z.string().min(2, "Title must be contain 2 characters!"),
  });

  const [title, setTitle] = useState("");

  const [errors, setErrors] = useState({});
  const onSubmitInput = (e) => {
    e.preventDefault();
    const parse = schema.safeParse({ title });
    let err = {};
    if (!parse.success) {
      parse.error.errors.forEach((ele) => (err[ele.path[0]] = ele.message));
      setErrors(err);
    } else {
      if (id) {
        dispatch(updateCategoryApicall([{ title }, token, id]));
        navigate("/admin/categories");
      } else {
        dispatch(addCategoryApicall([{ title }, token]));
        // setTimeout(() => {
        // 	if (isUpdateSucces) {
        // 	}
        // }, 100);
      }
    }
  };

  const onChangeInput = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (id) {
      dispatch(getCategoryApicall([token, id]));
    }
  }, [id]);

  useEffect(() => {
    if (category && id) {
      setTitle(category.title);
    }
  }, [category, id]);

  useEffect(() => {
    if ((isSuccess || isUpdateSucces) && !isLoading) {
      dispatch(resetAddCategory());
    }
    if (isUpdateSucces && !isLoading) {
      navigate("/admin/categories");
    }
  }, [isUpdateSucces, isError, isSuccess]);

  return (
    <>
      <h2 className="title mb-12">{id ? "Edit category" : "Add category"}</h2>
      <form className="flex flex-col " onSubmit={onSubmitInput}>
        <div>
          <CustomInput1
            type={"text"}
            id={"title"}
            placeholder={"Add Category"}
            name={"title"}
            onChange={onChangeInput}
            value={title}
          />
          {errors?.title && (
            <p className="text-red-600 text-xs font-semibold">{errors.title}</p>
          )}
        </div>
        <button
          type="submit"
          className={`text-slate-50 px-8 py-3 mt-5 rounded-md w-fit ${
            isLoading
              ? "bg-gray-300 hover:bg-gray-400"
              : "bg-green-700 hover:bg-green-800"
          }`}
          disabled={isLoading}
        >
          {id
            ? isLoading
              ? "Loading..."
              : "Edit category"
            : isLoading
            ? "Loading..."
            : "Add category"}
        </button>
      </form>
    </>
  );
}
