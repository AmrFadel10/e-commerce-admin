import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	getEnquiryApicall,
	updateEnquiryApicall,
} from "../redux/apicalls/enquiries.ApiCall";
import { resetEnquiry } from "../redux/slices/enquiries.Slice";

const ViewEnquiry = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const { token } = useSelector((state) => state.auth.user);
	const { isUpdatedSuccess, enquiry } = useSelector((state) => state.enquiries);
	useEffect(() => {
		if (id) {
			dispatch(getEnquiryApicall([token, id]));
		}
	}, [id]);

	useEffect(() => {
		if (isUpdatedSuccess) {
			dispatch(resetEnquiry());
			dispatch(getEnquiryApicall([token, id]));
		}
	}, [isUpdatedSuccess]);

	return (
		<div>
			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-bold my-4">View enquiry</h2>
				<div
					className="flex gap-2 items-center cursor-pointer border rounded-md py-2 px-3 hover:bg-gray-100"
					onClick={() => navigate(-1)}
				>
					<IoMdArrowBack size={20} />
					<span className="text-sm font-semibold">Go back</span>
				</div>
			</div>
			<div className="flex flex-col gap-6 bg-white rounded-xl p-8 shadow mt-12">
				<div className="flex gap-6 items-center">
					<h5 className="font-semibold">Name:</h5>
					<span>{enquiry?.name} </span>
				</div>
				<div className="flex gap-6 items-center">
					<h5 className="font-semibold">Mobile:</h5>
					<a
						href={`tel:+20 100 414 5525`}
						className="underline text-blue-600 underline-offset-2 hover:text-blue-800"
					>
						{enquiry?.mobile}
					</a>
				</div>
				<div className="flex gap-6 items-center">
					<h5 className="font-semibold">Email:</h5>
					<a
						href={`mailto:shahedhere99@gmail.com`}
						className="underline text-blue-600 underline-offset-2 hover:text-blue-800"
					>
						{enquiry?.email}
					</a>
				</div>
				<div className="flex gap-6 items-center">
					<h5 className="font-semibold">Comment:</h5>
					<span>{enquiry?.comment}</span>
				</div>
				<div className="flex gap-6 items-center">
					<h5 className="font-semibold">Status:</h5>
					<span>{enquiry?.status}</span>
				</div>
				<div className="flex gap-6 items-center">
					<h5 className="font-semibold">Change status:</h5>
					<select
						name="status"
						id="status"
						className="border-2 p-2 w-64 rounded-lg focus:outline-none"
						value={enquiry?.status}
						onChange={(e) => {
							console.log({ status: e.target.value });
							dispatch(
								updateEnquiryApicall([{ status: e.target.value }, token, id])
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
				</div>
			</div>
		</div>
	);
};

export default ViewEnquiry;
