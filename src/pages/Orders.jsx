import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ordersApiCall } from "../redux/apicalls/orders.ApiCall";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Orders() {
	const dispatch = useDispatch();
	const { orders, isError, isSuccess, message } = useSelector(
		(state) => state.orders
	);
	const { token } = useSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(ordersApiCall(token));
		if (isError) {
			toast.error(message);
		}
	}, []);

	return (
		<>
			<h2 className="title mb-12">Orders</h2>
			<table className="w-full bg-white rounded-lg">
				<thead>
					<tr className="border-b text-left text-gray-500">
						<th className="py-3 px-4">SNO</th>
						<th className="py-3 px-4">Name</th>
						<th className="py-3 px-4">Products</th>
						<th className="py-3 px-4">Amount</th>
						<th className="py-3 px-4">Mobile</th>
						<th className="py-3 px-4">Status</th>
						<th className="py-3 px-4">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y text-gray-500 font-normal">
					{orders?.slice(0, 10).map((item, index) => (
						<tr key={index} className="text-sm font-semibold text-gray-500 ">
							<td className="py-3 px-4">{index + 1}</td>
							<td className="py-3 px-4">{item.orderBy.name}</td>
							<td className="py-3 px-4 ">
								{/* <ul className="list-disc font-medium flex flex-col gap-3">
									{item.products.map((items, index) => {
										return (
											<li key={index} className="list-inside">
												{items.product.title}
											</li>
										);
									})}
								</ul> */}
								<Link
									to={`/admin/order/${item.orderBy._id}`}
									className="hover:underline text-blue-500 hover:text-blue-600 hover:underline-offset-2 font-semibold"
								>
									View Order
								</Link>
							</td>
							<td className="py-3 px-4">{item.paymentIntent.amount}</td>
							<td className="py-3 px-4 flex flex-col gap-1">
								<span>
									{new Date(item.paymentIntent.created).toLocaleDateString()}
								</span>
								<span>
									{new Date(item.paymentIntent.created).toLocaleTimeString()}
								</span>
							</td>

							<td className="py-3 px-4">{item.paymentIntent.status}</td>
							<td className="py-3 px-4 flex gap-1">
								<FaRegEdit
									size={22}
									color={`${"rgb(22,163,74)"}`}
									className="cursor-pointer"
								/>
								<AiOutlineDelete
									size={22}
									color="red"
									className="cursor-pointer"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
