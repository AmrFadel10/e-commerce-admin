import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { couponsApiCall } from "../redux/apicalls/coupons.ApiCall";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deleteCouponApicall } from "../redux/apicalls/addCoupon.ApiCall";
import { addCouponReset } from "../redux/slices/addCoupon.Slice";

export default function CouponList() {
	const dispatch = useDispatch();
	const { coupons, isError, isSuccess, message } = useSelector(
		(state) => state.coupons
	);
	const { coupon, isSuccess: success } = useSelector(
		(state) => state.addCoupon
	);
	const navigate = useNavigate();
	const [toggleModal, setToggleModal] = useState(false);
	const [deleteCoupon, setDeleteCoupon] = useState({});
	const [updatedCoupons, setUpdatedCoupons] = useState(coupons);
	const { token } = useSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(couponsApiCall(token));
		if (isError) {
			toast.error(message);
		}
	}, []);

	useEffect(() => {
		setUpdatedCoupons(coupons);
	}, [coupons]);

	useEffect(() => {
		if (success) {
			const arr = updatedCoupons?.filter(
				(item) => item._id !== deleteCoupon._id
			);
			setUpdatedCoupons(arr);
			dispatch(addCouponReset());
			dispatch(couponsApiCall(token));
		}
	}, [success, coupon]);
	return (
		<>
			<h2 className="title mb-12">Coupons</h2>
			<table className="w-full bg-white rounded-lg">
				<thead>
					<tr className="bcoupon-b text-left text-gray-500">
						<th className="py-3 px-4">SNO</th>
						<th className="py-3 px-4">Name</th>
						<th className="py-3 px-4">Discount</th>
						<th className="py-3 px-4">Expiry</th>
						<th className="py-3 px-4">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y text-gray-500 font-normal">
					{updatedCoupons?.slice(0, 10).map((item, index) => (
						<tr key={index} className="text-sm font-semibold text-gray-500 ">
							<td className="py-3 px-4">{index + 1}</td>
							<td className="py-3 px-4">{item.name}</td>
							<td className="py-3 px-4 ">{item.discount}</td>
							<td>
								<div className="py-3 px-4 flex flex-col gap-1">
									<span>{new Date(item.expiry).toLocaleDateString()}</span>
									<span>{new Date(item.expiry).toLocaleTimeString()}</span>
								</div>
							</td>

							<td className="py-3 px-4 flex gap-2 ">
								<FaRegEdit
									size={22}
									color={`${"rgb(22,163,74)"}`}
									className="cursor-pointer"
									onClick={() => navigate(`/admin/add-coupon/${item._id}`)}
								/>
								<AiOutlineDelete
									size={22}
									color="red"
									className="cursor-pointer"
									onClick={() => {
										setToggleModal(true);
										setDeleteCoupon(item);
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
							Delete {deleteCoupon?.name} category
						</h2>
						<p className="text-gray-500 text-sm">
							Are you sure you want to delete this {deleteCoupon?.name + " "}
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
								onClick={() => {
									setToggleModal(false);
								}}
							>
								Cancel
							</span>
							<span
								className="inline-block px-4 py-1 border bg-slate-800 rounded-md text-gray-50 cursor-pointer hover:bg-slate-900"
								onClick={() => {
									dispatch(
										deleteCouponApicall({ token, id: deleteCoupon._id })
									);
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
