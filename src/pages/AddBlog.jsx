import ReactQuill from "react-quill";
import { CustomInput1 } from "../components/CustomInput";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { blogsApiCall } from "../redux/apicalls/blogs.ApiCall";
import {
  addBlogApicall,
  getBlogApicall,
  updateBlogApicall,
} from "../redux/apicalls/addBlog.ApiCall";
import { FaRegImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { resetAddBlog } from "../redux/slices/addBlog.Slice";
import { blogCategoriesApiCall } from "../redux/apicalls/blogCategories.ApiCall";

export default function AddBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const { token } = useSelector((state) => state.auth.user);
  const { blogCategories } = useSelector((state) => state.blogCategories);
  const { blog, isUpdateSucces, isError, isLoading } = useSelector(
    (state) => state.addBlog
  );
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const schema = z.object({
    title: z.string().min(2, "Title must be contain above 2 characters!"),
    description: z
      .string()
      .min(30, "Description must be contain above 50 characters!"),
    category: z.string().min(1, "Categoryis required!"),
    image: z.any().refine((file) => {
      console.log(file);
      return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file?.type
      );
    }, "Just photo accept!"),
  });
  /**
	 * 
	 * .refine((file) => file.length > 0, "No photo provided!")
			.refine(
				(file) =>
					["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
						file?.[0]?.type
					),
				"Just photo accept!"
			),
	 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const parse = schema.safeParse(data);
    if (!parse.success) {
      const err = {};
      parse.error.errors.forEach((ele) => (err[ele.path[0]] = ele.message));
      setErrors(err);
    } else {
      if (id) {
        dispatch(updateBlogApicall([data, token, id]));
        navigate("/admin/blogs");
      } else {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("image", data.image);
        dispatch(addBlogApicall([formData, token]));
      }
      console.log(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setData({ ...data, description: value });
  };
  const onChangeImage = (e) => {
    console.log(e.target.files);
    setData({ ...data, image: e.target.files[0] });
  };

  useEffect(() => {
    if (id) {
      dispatch(getBlogApicall([token, id]));
    }
  }, [id]);

  useEffect(() => {
    if (blog && id) {
      setData({
        title: blog?.title,
        description: blog?.description,
        category: blog?.category,
      });
    }
  }, [blog, id]);

  useEffect(() => {
    if (isUpdateSucces) {
      navigate("/admin/blogs");
      dispatch(resetAddBlog());
    }
  }, [isUpdateSucces, isError]);

  useEffect(() => {
    dispatch(blogsApiCall());
    dispatch(blogCategoriesApiCall());
  }, []);
  console.log(data);
  return (
    <>
      <h2 className="title mb-12">{id ? "Edit blog" : "Add blog"}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <CustomInput1
            type={"text"}
            id={"title"}
            placeholder={"Title"}
            name={"title"}
            onChange={handleChange}
            value={data?.title}
          />
          {errors?.title && (
            <p className="text-red-600 text-xs font-semibold">{errors.title}</p>
          )}
        </div>
        <div>
          <select
            name="category"
            id="category"
            className="my-2 p-4 bg-white text-gray-600 focus:outline-none  w-full border focus:border-gray-400 rounded-md border-gray-300"
            onChange={handleChange}
            value={data?.category}
          >
            <option value="" disabled>
              Select blog category
            </option>
            {blogCategories?.map((ele, index) => {
              return (
                <option value={ele.title} key={index}>
                  {ele.title}
                </option>
              );
            })}
          </select>
          {errors?.category && (
            <p className="text-red-600 text-xs font-semibold">
              {errors.category}
            </p>
          )}
        </div>
        <div>
          <ReactQuill
            theme="snow"
            value={data.description}
            required
            placeholder="Write description..."
            onChange={handleDescriptionChange}
            className="bg-white h-72  mb-12 "
          />
          {errors?.description && (
            <p className="text-red-600 text-xs font-semibold">
              {errors.description}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="image"
            className={`w-full h-64 bg-white rounded-xl flex justify-center items-center ${
              errors?.color ? "border-red-600" : ""
            }`}
          >
            <input
              type="file"
              className="sr-only "
              id="image"
              onChange={onChangeImage}
            />
            <div className="flex flex-col gap-4">
              <FaRegImage size={200} className="text-gray-300 " />
              <span className="font-semibold text-2xl text-gray-400 font-sans">
                Download images
              </span>
            </div>
          </label>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 grid-cols-1">
            {data?.image && (
              <div className="rounded-lg shadow border border-gray-300 overflow-hidden">
                <img src={URL.createObjectURL(data?.image)} alt={`img`} />
              </div>
            )}
            {errors?.image && (
              <p className="text-red-600 text-xs font-semibold">
                {errors.image}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={` text-slate-50 px-8 py-3 mt-5 rounded-md w-fit ${
            isLoading ? " bg-gray-400" : "hover:bg-green-800  bg-green-700"
          }`}
          disabled={isLoading}
        >
          {id
            ? isLoading
              ? "Loading..."
              : "Edit blog"
            : isLoading
            ? "Loading..."
            : "Add blog"}
        </button>
      </form>
    </>
  );
}
