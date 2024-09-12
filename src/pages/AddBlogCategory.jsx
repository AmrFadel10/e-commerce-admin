import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogCategoryApicall,
  getBlogCategoryApicall,
  updateBlogCategoryApicall,
} from "../redux/apicalls/addBlogCategory.ApiCall";
import { useEffect, useState } from "react";
import { CustomInput1 } from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { resetAddBlogCategory } from "../redux/slices/addBlogCategory.Slice";

export default function AddBlogCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { token } = useSelector((state) => state.auth.user);
  const { blogCategory, isUpdateSuccess, isError, isLoading } = useSelector(
    (state) => state.addBlogCategory
  );

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
        dispatch(updateBlogCategoryApicall([{ title }, token, id]));
        navigate("/admin/blog-category-list");
      } else {
        dispatch(addBlogCategoryApicall([{ title }, token]));
        // setTimeout(() => {
        // 	if (isUpdateSuccess) {
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
      dispatch(getBlogCategoryApicall([token, id]));
    }
  }, [id]);

  useEffect(() => {
    if (blogCategory && id) {
      setTitle(blogCategory.title);
    }
  }, [blogCategory, id]);

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/admin/blog-category-list");
      dispatch(resetAddBlogCategory());
    }
  }, [isUpdateSuccess, isError]);

  return (
    <>
      <h2 className="title mb-12">
        {id ? "Edit blogCategory" : "Add blogCategory"}
      </h2>
      <form className="flex flex-col " onSubmit={onSubmitInput}>
        <div>
          <CustomInput1
            type={"text"}
            id={"title"}
            placeholder={"Add BlogCategory"}
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
              : "Edit blogCategory"
            : isLoading
            ? "Loading..."
            : "Add blogCategory"}
        </button>
      </form>
    </>
  );
}
