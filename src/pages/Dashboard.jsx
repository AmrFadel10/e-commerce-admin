import { data, options } from "../components/Chart";
import { Bar } from "react-chartjs-2";
import Table from "../components/Table";
import { PiArrowDownRightBold } from "react-icons/pi";
import { PiArrowUpRightFill } from "react-icons/pi";

export default function Dashboard() {
	return (
		<>
			<h2 className="title mb-12">Dashboard</h2>
			<div className="flex gap-12 w-full">
				<div className="flex justify-between bg-white shadow p-6 rounded-lg flex-1">
					<div className="flex content-between flex-col gap-5">
						<h5 className="font-light text-lg">Total</h5>
						<span className="subtitle font-semibold">$1100.00</span>
					</div>
					<div className="flex flex-col gap-2 justify-end">
						<div className="items-center flex gap-1 justify-end red">
							<PiArrowDownRightBold className="text-lg" />
							<span className="text-xl">32%</span>
						</div>
						<div className="text-lg font-light">Compared to April 2022</div>
					</div>
				</div>
				<div className="flex justify-between bg-white shadow p-6 rounded-lg flex-1">
					<div className="flex content-between flex-col gap-5">
						<h5 className="font-light text-lg">Total</h5>
						<span className="subtitle font-semibold">$1100.00</span>
					</div>
					<div className="flex flex-col gap-2 justify-end">
						<div className="items-center flex gap-1 justify-end green">
							<PiArrowUpRightFill className="text-lg" />
							<span className="text-xl">32%</span>
						</div>
						<div className="text-lg font-light">Compared to April 2022</div>
					</div>
				</div>
				<div className="flex justify-between bg-white shadow p-6 rounded-lg flex-1">
					<div className="flex content-between flex-col gap-5">
						<h5 className="font-light text-lg">Total</h5>
						<span className="subtitle font-semibold">$1100.00</span>
					</div>
					<div className="flex flex-col gap-2 justify-end">
						<div className="items-center flex gap-1 justify-end red">
							<PiArrowDownRightBold className="text-lg" />
							<span className="text-xl">32%</span>
						</div>
						<div className="text-lg font-light">Compared to April 2022</div>
					</div>
				</div>
			</div>
			<div className=" my-20">
				<h4 className="subtitle mb-5">Income statics</h4>
				<Bar options={options} data={data} />;
			</div>
			<div className="my-12 shadow-md bg-white rounded-lg ">
				<h4 className="p-4 subtitle text-lg">Recent orders</h4>
				<Table />
			</div>
		</>
	);
}
