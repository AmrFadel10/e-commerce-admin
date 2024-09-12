import "react-quill/dist/quill.snow.css";

import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  addColorApicall,
  getColorApicall,
  updateColorApicall,
} from "../redux/apicalls/addColor.ApiCall";
import { useEffect, useState } from "react";
import { CustomInput1 } from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { addColorReset } from "../redux/slices/addColor.Slice";

export default function AddColor() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.user);
  const { color, isUpdateSuccess, isLoading } = useSelector(
    (state) => state.addColor
  );
  const { id } = useParams();
  const schema = z.object({
    title: z.string().min(2, "Title must be contain 2 characters!"),
  });
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [errors, setErrors] = useState({});
  const onSubmitInput = (e) => {
    e.preventDefault();
    const parse = schema.safeParse({ title });
    let err = {};
    if (!parse.success) {
      parse.error.errors.forEach((ele) => (err[ele.path[0]] = ele.message));
      setErrors(err);
      console.log(errors);
    } else {
      if (id) {
        dispatch(updateColorApicall({ token, id, info: { title } }));
      } else {
        dispatch(addColorApicall([{ title }, token]));
      }
    }
  };
  const onChangeInput = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (id) {
      dispatch(getColorApicall({ token, id }));
    }
  }, [id]);

  useEffect(() => {
    if (id && color) {
      setTitle(color?.title);
    }
  }, [id, color]);

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(addColorReset());
      navigate("/admin/colors");
      console.log("object");
    }
  }, [isUpdateSuccess]);

  return (
    <>
      <h2 className="title mb-12">{id ? "Edit color" : "Add color"}</h2>
      <form className="flex flex-col " onSubmit={onSubmitInput}>
        <div>
          <CustomInput1
            type={"text"}
            id={"title"}
            placeholder={"Add Color"}
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
          className={`   text-slate-50 px-8 py-3 mt-5 rounded-md w-fit ${
            isLoading
              ? "bg-gray-300 hover:bg-gray-400"
              : "bg-green-700 hover:bg-green-800"
          }`}
          disabled={isLoading}
        >
          {id
            ? isLoading
              ? "Loading..."
              : "Edit Color"
            : isLoading
            ? "Loading..."
            : "Add Color"}
        </button>
      </form>
    </>
  );
}
