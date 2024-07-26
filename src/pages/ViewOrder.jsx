import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByUserIdApicall } from "../redux/apicalls/orders.ApiCall";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";

export default function ViewOrder() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { order } = useSelector((state) => state.orders);
	const { token } = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (id) {
			dispatch(getOrderByUserIdApicall([token, id]));
		}
	}, [id]);

	return (
		<>
			<h2 className="title mb-12">View order</h2>
			<table className="w-full bg-white rounded-lg">
				<thead>
					<tr className="border-b text-left text-gray-500">
						<th className="py-3 px-4">SNO</th>
						<th className="py-3 px-4">Product name</th>
						<th className="py-3 px-4">Brand</th>
						<th className="py-3 px-4">Count</th>
						<th className="py-3 px-4">Color</th>
						<th className="py-3 px-4">Price</th>
						<th className="py-3 px-4">Date</th>
						<th className="py-3 px-4">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y text-gray-500 font-normal">
					{order?.products.slice(0, 10).map((item, index) => (
						<tr key={index} className="text-sm font-semibold text-gray-500 ">
							<td className="py-3 px-4">{index + 1}</td>
							<td className="py-3 px-4">{item.product.title}</td>
							<td className="py-3 px-4">{item.product.brand}</td>
							<td className="py-3 px-4">{item.count}</td>
							<td className="py-3 px-4">{item.color}</td>
							<td className="py-3 px-4">{item.product.price}</td>
							<td className="py-3 px-4">
								<span>
									{new Date(item.product.updatedAt).toLocaleDateString()}
								</span>
								<span>
									{new Date(item.product.updatedAt).toLocaleTimeString()}
								</span>
							</td>

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
