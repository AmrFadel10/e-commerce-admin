import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";

export default function ResetPassword() {
	return (
		<>
			<Meta title={"Reset Password"} />
			<section className="min-h-screen flex items-center justify-center">
				<div className="shadow-md  bg-white p-8 max-w-[550px] mx-auto rounded-xl md:min-w-[500px]">
					<h2 className="text-gray-500 text-center text-xl font-medium mb-5">
						Reset Password
					</h2>{" "}
					<p className="text-center mb-4 text-gray-500">
						Please enter your new password !
					</p>
					<form className="flex flex-col gap-4 mb-3">
						<CustomInput
							type={"password"}
							placeholder={"Password"}
							name={"password"}
							id={"password"}
						/>
						<CustomInput
							type={"password"}
							placeholder={"Confirm Password"}
							name={"confirm_password"}
							id={"confirm_password"}
						/>
						<button
							type="submit"
							className="hover:bg-orange-300 hover:text-slate-800 bg-slate-800 text-slate-200 px-8 py-3 mt-5 rounded-full w-fit transition-all mx-auto"
						>
							Reset password
						</button>
					</form>
				</div>
			</section>
		</>
	);
}
