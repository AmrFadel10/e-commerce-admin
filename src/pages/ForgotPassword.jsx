import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
	return (
		<>
			<Meta title={"forgot password"} />
			<section className="min-h-screen flex items-center justify-center">
				<div className="shadow-md bg-white p-8 max-w-[550px] mx-auto rounded-xl md:min-w-[500px]">
					<h2 className="text-gray-500 text-center text-xl font-medium mb-5">
						Forget Your password
					</h2>
					<p className="text-center mb-4 text-gray-500">
						We will send you an email to reset your password
					</p>
					<form className="flex flex-col gap-4 mb-3">
						<CustomInput
							type={"email"}
							placeholder={"Email address"}
							name={"email"}
							id={"email"}
						/>
						<div className="flex flex-col items-center gap-2 ">
							<button
								type="submit"
								className="hover:bg-orange-300 hover:text-slate-800 bg-slate-800 text-slate-200 px-8 py-3  rounded-full w-fit transition-all"
							>
								Send link
							</button>
							<Link
								to={"/"}
								className=" px-8 py-3 rounded-full w-fit transition-all"
							>
								Cancel
							</Link>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
