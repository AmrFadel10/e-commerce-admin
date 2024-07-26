import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsApiCall } from "../redux/apicalls/products.ApiCall";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

export default function ProductsList() {
	const dispatch = useDispatch();
	const { products, isError, isSuccess, message } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		dispatch(productsApiCall());
		if (isError) {
			toast.error(message);
		}
	}, []);

	return (
		<>
			<h2 className="title mb-12">Products</h2>

			<table className="w-full bg-white rounded-lg">
				<thead>
					<tr className="border-b text-left text-gray-500">
						<th className="py-2 px-4">SNO</th>
						<th className="py-2 px-4">Title</th>
						<th className="py-2 px-4">Brand</th>
						<th className="py-2 px-4">Category</th>
						<th className="py-2 px-4">Color</th>
						<th className="py-2 px-4">Price</th>
						<th className="py-2 px-4">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y text-gray-500 font-normal">
					{products?.slice(0, 10).map((item, index) => (
						<tr key={index} className="text-sm font-semibold text-gray-500 ">
							<td className="py-2 px-4">{index + 1}</td>
							<td className="py-2 px-4">{item.title}</td>
							<td className="py-2 px-4">{item.brand}</td>
							<td className="py-2 px-4">{item.category}</td>
							<td className="py-2 px-4">{item.color?.[0]?.title}</td>
							<td className="py-2 px-4">{item.price} $</td>
							<td className="py-2 px-4 flex gap-1">
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
