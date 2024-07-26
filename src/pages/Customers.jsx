import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { customersApiCall } from "../redux/apicalls/customers.ApiCall";

export default function Customers() {
	const dispatch = useDispatch();
	const { customers, isError, isSuccess, message } = useSelector(
		(state) => state.customers
	);
	const { token } = useSelector((state) => state.auth.user);
	useEffect(() => {
		dispatch(customersApiCall(token));
		if (isError) {
			toast.error(message);
		}
	}, []);
	return (
		<>
			<h2 className="title mb-12">Customers</h2>
			<Table customers={customers} />
		</>
	);
}
