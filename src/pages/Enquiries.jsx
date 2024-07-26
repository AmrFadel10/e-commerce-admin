import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	deleteEnquiryApicall,
	enquiriesApiCall,
	updateEnquiryApicall,
} from "../redux/apicalls/enquiries.ApiCall";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { resetEnquiry } from "../redux/slices/enquiries.Slice";
import { useNavigate } from "react-router-dom";

export default function BrandList() {
	const dispatch = useDispatch();
	const { enquiries, isDeletedSuccess, isUpdatedSuccess } = useSelector(
		(state) => state.enquiries
	);
	const navigate = useNavigate();
	const [toggleModal, setToggleModal] = useState(false);
	const [deleteEnquiry, setDeleteEnquiry] = useState({});

	const { token } = useSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(enquiriesApiCall(token));
	}, []);

	useEffect(() => {
		if (isDeletedSuccess || isUpdatedSuccess) {
			dispatch(enquiriesApiCall(token));
			dispatch(resetEnquiry());
		}
	}, [isDeletedSuccess, isUpdatedSuccess]);

	// useEffect(()=>{
	// 	if(isUpdatedSuccess){
	// 		dispatch(enquiriesApiCall(token));
	// 		dispatch(resetEnquiry())
	// 	}
	// },[isUpdatedSuccess])
	return (
		<>
			<h2 className="title mb-12">Enquiries</h2>
			<table className="w-full bg-white rounded-lg">
				<thead>
					<tr className="border-b text-left text-gray-500">
						<th className="py-3 px-4">SNO</th>
						<th className="py-3 px-4">Name</th>
						<th className="py-3 px-4">Email</th>
						<th className="py-3 px-4">Comment</th>
						<th className="py-3 px-4">Mobile</th>
						<th className="py-3 px-4">Status</th>
						<th className="py-3 px-4">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y text-gray-500 font-normal">
					{enquiries?.slice(0, 10).map((item, index) => (
						<tr key={index} className="text-sm font-semibold text-gray-500 ">
							<td className="py-3 px-4">{index + 1}</td>
							<td className="py-3 px-4">{item.name}</td>
							<td className="py-3 px-4">{item.email}</td>
							<td className="py-3 px-4">{item.comment}</td>
							<td className="py-3 px-4">{item.mobile}</td>
							<td className="py-3 px-4">
								<select
									name="status"
									id="status"
									className="border-2 p-2 w-64 rounded-lg focus:outline-none"
									value={item.status}
									onChange={(e) => {
										dispatch(
											updateEnquiryApicall([
												{ status: e.target.value },
												token,
												item._id,
											])
										);
									}}
								>
									<option value="" disabled>
										Select status
									</option>
									<option value="Submitted">Submitted</option>
									<option value="Contacted">Contacted</option>
									<option value="In progress">In progress</option>
									<option value="Resolved">Resolved</option>
								</select>
							</td>
							<td className="py-3 px-4 flex gap-3 items-center">
								<AiOutlineEye
									size={26}
									className="cursor-pointer text-green-400 hover:text-green-600"
									title="view enqiury"
									onClick={() => {
										navigate(`/admin/equiries/${item._id}`);
									}}
								/>
								<AiOutlineDelete
									size={24}
									className="cursor-pointer text-red-400 hover:text-red-600"
									title="delete enquiry"
									onClick={() => {
										setToggleModal(true);
										setDeleteEnquiry({
											id: item._id,
											name: item.name,
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
							Delete ({deleteEnquiry?.name}) enquiry
						</h2>
						<p className="text-gray-500 text-sm">
							Are you sure you want to delete this ({deleteEnquiry?.name + " "})
							enquiry
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
									dispatch(
										deleteEnquiryApicall({ token, id: deleteEnquiry.id })
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
