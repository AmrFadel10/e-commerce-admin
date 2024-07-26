export default function Table({ customers }) {
	const showingitems = customers
		?.slice(0, 10)
		.filter((item) => item.role !== "admin")
		.map((item, index) => {
			return (
				<tr key={index} className="  ">
					<td className="py-4 px-4">{index + 1}</td>
					<td className="py-4 px-4">{item.name}</td>
					<td className="py-4 px-4">{item.email}</td>
					<td className="py-4 px-4">{item.mobile}</td>
				</tr>
			);
		});
	return (
		<>
			{showingitems?.length > 0 ? (
				<table className="w-full bg-white rounded-lg">
					<thead>
						<tr className="border-b text-left text-gray-500">
							<th className="py-4 px-4">SNO</th>
							<th className="py-4 px-4">Name</th>
							<th className="py-4 px-4">Email</th>
							<th className="py-4 px-4">Mobile</th>
						</tr>
					</thead>
					<tbody className="divide-y text-gray-500 font-normal">
						{showingitems}
					</tbody>
				</table>
			) : (
				<div className="w-full h-full flex items-center justify-center font-semibold text-gray-600">
					No customers to see!
				</div>
			)}
		</>
	);
}
