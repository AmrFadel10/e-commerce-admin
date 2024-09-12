import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  addCouponApicall,
  getCouponApicall,
  updateCouponApicall,
} from "../redux/apicalls/addCoupon.ApiCall";
import { useEffect, useState } from "react";
import { CustomInput1 } from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { addCouponReset } from "../redux/slices/addCoupon.Slice";

export default function AddCoupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth.user);
  const { coupon, isLoading, isUpdateSuccess } = useSelector(
    (state) => state.addCoupon
  );
  const schema = z.object({
    name: z.string().min(2, "Title must be contain 2 characters!"),
    expiry: z.coerce.string().date().min(1, "Expiry is required!"),

    discount: z.coerce
      .number()
      .gte(1, "Discount must be greater than or equal 1 "),
  });

  const [data, setData] = useState({
    name: "",
    expiry: "",
    discount: "",
  });

  const [errors, setErrors] = useState({});
  const onSubmitInput = (e) => {
    e.preventDefault();
    const parse = schema.safeParse(data);
    let err = {};
    if (!parse.success) {
      parse.error.errors.forEach((ele) => (err[ele.path[0]] = ele.message));
      setErrors(err);
    } else {
      if (id) {
        dispatch(updateCouponApicall({ info: data, token, id }));
      } else {
        dispatch(addCouponApicall([data, token]));
      }
    }
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (id) {
      dispatch(getCouponApicall({ id, token }));
    }
  }, [id]);

  useEffect(() => {
    if (id && coupon) {
      setData({
        name: coupon?.name,
        expiry: coupon.expiry.split("T")[0],
        discount: coupon?.discount,
      });
    }
  }, [id, coupon]);
  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(addCouponReset());
      navigate("/admin/coupons");
    }
  }, [isUpdateSuccess]);

  return (
    <>
      <h2 className="title mb-12">{id ? "Edit coupon" : "Add coupon"}</h2>
      <form className="flex flex-col " onSubmit={onSubmitInput}>
        <div>
          <CustomInput1
            type={"text"}
            placeholder={"Add Coupon"}
            name={"name"}
            onChange={onChangeInput}
            value={data?.name}
          />
          {errors?.name && (
            <p className="text-red-600 text-xs font-semibold">{errors.name}</p>
          )}
        </div>
        <div>
          <CustomInput1
            type={"date"}
            placeholder={"Add Coupon"}
            name={"expiry"}
            onChange={onChangeInput}
            value={data?.expiry}
          />
          {errors?.expiry && (
            <p className="text-red-600 text-xs font-semibold">
              {errors.expiry}
            </p>
          )}
        </div>
        <div>
          <CustomInput1
            type={"number"}
            placeholder={"discount"}
            name={"discount"}
            onChange={onChangeInput}
            value={data?.discount}
          />
          {errors?.discount && (
            <p className="text-red-600 text-xs font-semibold">
              {errors.discount}
            </p>
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
              : "Edit coupon"
            : isLoading
            ? "Loading..."
            : "Add coupon"}
        </button>
      </form>
    </>
  );
}
