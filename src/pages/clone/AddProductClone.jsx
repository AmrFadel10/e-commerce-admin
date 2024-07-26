import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../components/CustomInput";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { addProductApicall } from "../redux/apicalls/addProduct.ApiCall";
import { useEffect } from "react";
import { categoryApiCall } from "../redux/apicalls/category.ApiCall";
import { brandsApiCall } from "../redux/apicalls/brands.ApiCall";
import { colorsApiCall } from "../redux/apicalls/colors.ApiCall";

export default function AddProduct() {
	const dispatch = useDispatch();
	const { brands } = useSelector((state) => state.brands);
	const { categories } = useSelector((state) => state.categories);
	const { colors } = useSelector((state) => state.colors);
	useEffect(() => {
		dispatch(categoryApiCall());
		dispatch(brandsApiCall());
		dispatch(colorsApiCall());
	}, []);

	const schema = z.object({
		title: z.string().trim().min(2, "Title must be above 2 characters"),
		description: z
			.string()
			.trim()
			.min(60, "Description must be above 50 characters"),
		price: z.preprocess(
			(val) => Number(val),
			z.number().gt(1, "Must be greater than 1")
		),
		quantity: z.preprocess(
			(val) => Number(val),
			z.number().gt(1, "at least must be have one!!")
		),
		brand: z.string().trim().min(1, "Brand is required"),
		category: z.string().trim().min(1, "Category is required"),
		color: z
			.array(z.string())
			.nonempty({ message: "Please select at least one color" }),
		image: z
			.any()
			.refine((val) => val.length > 0, "Must be have one image at least!")
			.refine((val) => val.startsWith("image"), "Just accept images!"),
	});

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({ mode: "onBlur", resolver: zodResolver(schema) });

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("price", data.price);
		formData.append("quantity", data.quantity);
		formData.append("brand", data.brand);
		formData.append("category", data.category);
		formData.append("color", data.color);
		formData.append("image", data.image);
		console.log(formData);
		dispatch(addProductApicall(formData));
	};

	return (
		<>
			<h2 className="title mb-12">Add product</h2>
			<form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<CustomInput
						type="text"
						placeholder="Enter title..."
						id="title"
						name="title"
						register={register}
						className={`${errors?.title ? "border-red-600" : ""}`}
					/>
					{errors?.title?.message && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.title.message}
						</p>
					)}
				</div>

				<div>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<>
								<ReactQuill
									theme="snow"
									placeholder="Write description..."
									className={`bg-white h-72 mb-12 ${
										errors?.description ? "border-red-600" : ""
									}`}
									onBlur={field.onBlur}
									onChange={field.onChange}
									value={field.value || ""}
								/>
								{errors?.description?.message && (
									<p className="text-red-600 text-xs font-semibold">
										{errors.description.message}
									</p>
								)}
							</>
						)}
					/>
				</div>

				<div>
					<CustomInput
						type="number"
						placeholder="Enter price..."
						id="price"
						name="price"
						register={register}
						className={`${errors?.price ? "border-red-600" : ""}`}
					/>
					{errors?.price?.message && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.price.message}
						</p>
					)}
				</div>

				<div>
					<select
						name="brand"
						id="brand"
						className={`my-2 p-4 bg-white text-gray-600 focus:outline-none w-full border focus:border-gray-400 rounded-md border-gray-300 space-y-2 ${
							errors?.brand ? "border-red-600" : ""
						}`}
						{...register("brand")}
					>
						<option value="">Select brand</option>
						{brands?.map((brand, index) => {
							return (
								<option value={brand.title} key={index} className="">
									{brand.title}
								</option>
							);
						})}
					</select>
					{errors?.brand?.message && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.brand.message}
						</p>
					)}
				</div>

				<div>
					<select
						name="category"
						id="category"
						className={`my-2 p-4 bg-white text-gray-600 focus:outline-none w-full border focus:border-gray-400 rounded-md border-gray-300 ${
							errors?.category ? "border-red-600" : ""
						}`}
						{...register("category")}
					>
						<option value="">Select category</option>
						{categories?.map((cat, index) => {
							return (
								<option value={cat.title} key={index}>
									{cat.title}
								</option>
							);
						})}
					</select>
					{errors?.category?.message && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.category.message}
						</p>
					)}
				</div>

				<div>
					<select
						name="color"
						id="color"
						className={`my-2 p-4 bg-white text-gray-600 focus:outline-none w-full border focus:border-gray-400 rounded-md border-gray-300 ${
							errors?.color ? "border-red-600" : ""
						}`}
						{...register("color")}
						multiple
					>
						{colors?.map((col, index) => {
							return (
								<option value={col.title} key={index}>
									{col.title}
								</option>
							);
						})}
					</select>
					{errors?.color?.message && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.color.message}
						</p>
					)}
				</div>
				<div>
					<CustomInput
						type="number"
						placeholder="Enter quantity..."
						id="quantity"
						name="quantity"
						register={register}
						className={`${errors?.quantity ? "border-red-600" : ""}`}
					/>
					{errors?.quantity?.message && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.quantity.message}
						</p>
					)}
				</div>
				<button
					type="submit"
					className="hover:bg-green-800 bg-green-700 text-slate-50 px-8 py-3 mt-5 rounded-md w-fit"
				>
					Add product
				</button>
			</form>
		</>
	);
}

/**
 * 
 * 					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<>
								<ReactQuill
									theme="snow"
									placeholder="Write description..."
									className={`bg-white h-72 mb-12 ${
										errors?.description ? "border-red-600" : ""
									}`}
									value={field.value || ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
								{errors?.description?.message && (
									<p className="text-red-600 text-xs font-semibold">
										{errors.description.message}
									</p>
								)}
							</>
						)}
					/>
 * 
 * **/
