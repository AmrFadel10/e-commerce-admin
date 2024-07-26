import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Signup() {
	const dispatch = useDispatch();
	const { isLoading, isError, message, isSuccess } = useSelector(
		(state) => state.auth
	);
	const navigate = useNavigate();
	const schema = z.object({
		email: z.string().email("this field must be email"),
		password: z.string().min(6),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: "onBlur",
		resolver: zodResolver(schema),
	});

	const onSubmit = (data) => {
		dispatch(loginApicall(data));
	};
	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess) {
			toast.success(message);
			navigate("/admin");
		}
	}, [isLoading]);
	return (
		<>
			<Meta title={"Signin"} />
			<section className="min-h-screen flex justify-center items-center">
				<div className="shadow-md bg-white p-8 max-w-[550px] md:w-[500px] mx-auto rounded-xl ">
					<h2 className="text-gray-500 text-center text-xl font-medium mb-5">
						Login
					</h2>
					<p className="text-center mb-4 text-gray-500">
						Login to your account to continue
					</p>
					<form className="flex flex-col gap-4 mb-3">
						<div>
							<CustomInput
								type={"email"}
								placeholder={"Email"}
								id={"email"}
								name={"email"}
								register={register}
								className={`${errors?.email?.message && "border-red-600"}`}
							/>
							{errors?.email?.message && (
								<p className="text-red-600 text-xs font-semibold">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<CustomInput
								type={"password"}
								placeholder={"Password"}
								name={"password"}
								id={"password"}
								register={register}
								className={`${errors?.password?.message && "border-red-600"}`}
							/>
							{errors?.password?.message && (
								<p className="text-red-600 text-xs font-semibold">
									{errors.password.message}
								</p>
							)}
						</div>
						<div>
							<CustomInput
								type={"password"}
								placeholder={"confirm password..."}
								name={"confirmPassword"}
								id={"confirmPassword"}
								register={register}
								className={`${errors?.password?.message && "border-red-600"}`}
							/>
							{errors?.password?.message && (
								<p className="text-red-600 text-xs font-semibold">
									{errors.password.message}
								</p>
							)}
						</div>

						<Link
							to={"/forget-password"}
							className=" hover:underline underline-offset-2"
						>
							Forgot your password?
						</Link>
						<div className="flex justify-center gap-8">
							<button
								type="submit"
								className="hover:bg-orange-300 hover:text-slate-800 bg-slate-800 text-slate-200 px-8 py-3 mt-5 rounded-full w-fit transition-all"
							>
								Login
							</button>
							<Link
								to={"/signup"}
								className="bg-orange-300 text-slate-800 hover:bg-slate-800 hover:text-slate-200 px-8 py-3 mt-5 rounded-full w-fit transition-all"
							>
								Signup
							</Link>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
