import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrandApicall,
  getBrandApicall,
  updateBrandApicall,
} from "../redux/apicalls/addBrand.ApiCall";
import { useEffect, useState } from "react";
import { CustomInput1 } from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
export default function AddBrand() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { token } = useSelector((state) => state.auth.user);
  const { brand, isSuccess, isBrandUpdated } = useSelector(
    (state) => state.addBrand
  );
  const navigate = useNavigate();

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
        dispatch(updateBrandApicall([{ title }, token, id]));
      } else {
        dispatch(addBrandApicall([{ title }, token]));
      }
    }
  };
  useEffect(() => {
    if (isBrandUpdated) {
      navigate("/admin/brands");
    }
  }, [isBrandUpdated]);
  const onChangeInput = (e) => {
    setTitle(e.target.value);
  };

  // useEffect(() => {
  // 	if (id) {
  // 		dispatch(getBrandApicall([token, id]));
  // 		setTitle(brand?.title);
  // 	}
  // }, [id]);
  useEffect(() => {
    if (id) {
      dispatch(getBrandApicall([token, id]));
    }
  }, [id]);

  useEffect(() => {
    if (brand && id) {
      setTitle(brand.title);
    }
  }, [brand, id]);
  return (
    <>
      <h2 className="title mb-12">{id ? "Edit brand" : "Add brand"}</h2>
      <form className="flex flex-col " onSubmit={onSubmitInput}>
        <div>
          <CustomInput1
            type={"text"}
            id={"title"}
            placeholder={"Add Brand"}
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
          className="hover:bg-green-800  bg-green-700 text-slate-50 px-8 py-3 mt-5 rounded-md w-fit "
        >
          {id ? "Edit brand" : "Add brand"}
        </button>
      </form>
    </>
  );
}
