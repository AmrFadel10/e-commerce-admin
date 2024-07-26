import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaRegImage } from "react-icons/fa6";

import { CustomInput1 } from "../components/CustomInput";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { addProductApicall } from "../redux/apicalls/addProduct.ApiCall";
import { useEffect, useState } from "react";
import { categoryApiCall } from "../redux/apicalls/category.ApiCall";
import { brandsApiCall } from "../redux/apicalls/brands.ApiCall";
import { colorsApiCall } from "../redux/apicalls/colors.ApiCall";

export default function AddProduct() {
	const dispatch = useDispatch();
	const { brands } = useSelector((state) => state.brands);
	const { categories } = useSelector((state) => state.categories);
	const { colors } = useSelector((state) => state.colors);
	const { token } = useSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(categoryApiCall());
		dispatch(brandsApiCall());
		dispatch(colorsApiCall());
	}, []);

	const schema = z.object({
		title: z.string().min(2, "Title must be contain 2 characters!"),
		description: z.string().min(2, "Description must be contain 2 characters!"),
		price: z.preprocess(
			(val) => Number(val),
			z.number().gte(1, "Price must be greater than or equal 1")
		),
		quantity: z.preprocess(
			(val) => Number(val),
			z.number().gte(1, "Price must be greater than or equal 1")
		),
		tags: z.string().min(1, "Tag is required"),
		brand: z.string().min(2, "Brand must be contain 2 characters!"),
		category: z.string().min(1, "Category is required!"),
		color: z
			.array(z.string())
			.nonempty("Color must be contain 1 color at least!"),
		images: z
			.array(z.instanceof(File))
			.nonempty("Must have one image at least!")
			.refine(
				(files) => files.every((file) => file.type.startsWith("image/")),
				"Just accept images!"
			),
	});

	const [data, setData] = useState({
		title: "",
		description: "",
		price: null,
		brand: "",
		quantity: null,
		category: "",
		color: [],
		images: [],
		tags: "",
	});

	const [errors, setErrors] = useState({});
	const onSubmitInput = (e) => {
		e.preventDefault();
		const parse = schema.safeParse(data);
		if (!parse.success) {
			let errorContainer = {};
			parse.error.errors.forEach((err) => {
				errorContainer[err.path[0]] = err.message;
			});
			setErrors(errorContainer);
		} else {
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("price", data.price);
			formData.append("quantity", data.quantity);
			formData.append("brand", data.brand);
			formData.append("category", data.category);
			formData.append("color", data.color);
			formData.append("tags", data.tags);
			for (let i = 0; i < data.images.length; i++) {
				formData.append("images", data.images[i]);
			}
			dispatch(addProductApicall({ formData, token }));
		}
	};

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		if (e.target.type === "select-multiple") {
			const arr = Object.values(e.target.options)
				.filter((item) => item.selected)
				.map((item) => item.value);

			setData({ ...data, [name]: arr });
		} else {
			setData({ ...data, [name]: value });
		}
	};

	const onChangeImage = (e) => {
		setData({ ...data, images: Array.from(e.target.files) });
	};

	const onChangeDescription = (value) => {
		setData({ ...data, description: value });
	};

	return (
		<>
			<h2 className="title mb-12">Add product</h2>
			<form className="flex gap-4 flex-col" onSubmit={onSubmitInput}>
				<div>
					<CustomInput1
						type="text"
						placeholder="Enter title..."
						id="title"
						name="title"
						className={`${errors?.title ? "border-red-600" : ""}`}
						defaultValue={data.title}
						onChange={onChangeInput}
					/>
					{errors?.title && (
						<p className="text-red-600 text-xs font-semibold">{errors.title}</p>
					)}
				</div>

				<div>
					<ReactQuill
						theme="snow"
						placeholder="Write description..."
						className={`bg-white h-72 mb-12 ${
							errors?.description ? "border-red-600" : ""
						}`}
						onChange={onChangeDescription}
						name="description"
						defaultValue={data.description}
					/>
					{errors?.description && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.description}
						</p>
					)}
				</div>

				<div>
					<CustomInput1
						type="number"
						placeholder="Enter price..."
						id="price"
						name="price"
						defaultValue={data.price}
						onChange={onChangeInput}
						className={`${errors?.price ? "border-red-600" : ""}`}
					/>
					{errors?.price && (
						<p className="text-red-600 text-xs font-semibold">{errors.price}</p>
					)}
				</div>

				<div>
					<select
						name="brand"
						id="brand"
						className={`my-2 p-4 bg-white text-gray-600 focus:outline-none w-full border focus:border-gray-400 rounded-md border-gray-300 space-y-2 ${
							errors?.brand ? "border-red-600" : ""
						}`}
						defaultValue={data.brand}
						onChange={onChangeInput}
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
					{errors?.brand && (
						<p className="text-red-600 text-xs font-semibold">{errors.brand}</p>
					)}
				</div>

				<div>
					<select
						name="category"
						id="category"
						className={`my-2 p-4 bg-white text-gray-600 focus:outline-none w-full border focus:border-gray-400 rounded-md border-gray-300 ${
							errors?.category ? "border-red-600" : ""
						}`}
						defaultValue={data.category}
						onChange={onChangeInput}
					>
						<option value="" disabled>
							Select category
						</option>
						{categories?.map((cat, index) => {
							return (
								<option value={cat.title} key={index}>
									{cat.title}
								</option>
							);
						})}
					</select>
					{errors?.category && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.category}
						</p>
					)}
				</div>
				<div>
					<select
						name="tags"
						id="tags"
						defaultValue={data.tags}
						onChange={onChangeInput}
						className={`my-2 p-4 bg-white text-gray-600 focus:outline-none w-full border focus:border-gray-400 rounded-md border-gray-300 ${
							errors?.category ? "border-red-600" : ""
						}`}
					>
						<option value="" disabled>
							Select tag
						</option>
						<option value="featured">Featured</option>
						<option value="popular">Popular</option>
						<option value="special">Special</option>
					</select>
					{errors?.tags && (
						<p className="text-red-600 text-xs font-semibold">{errors.tags}</p>
					)}
				</div>
				<div>
					<select
						name="color"
						id="color"
						className={`my-2 p-4 bg-white text-gray-600 focus:outline-none w-full border focus:border-gray-400 rounded-md border-gray-300 ${
							errors?.color ? "border-red-600" : ""
						}`}
						defaultValue={data.color}
						onChange={onChangeInput}
						multiple
					>
						{colors?.map((col, index) => {
							return (
								<option value={col._id} key={index}>
									{col.title}
								</option>
							);
						})}
					</select>
					{errors?.color && (
						<p className="text-red-600 text-xs font-semibold">{errors.color}</p>
					)}
				</div>
				<div>
					<CustomInput1
						type="number"
						placeholder="Enter quantity..."
						id="quantity"
						name="quantity"
						defaultValue={data.quantity}
						onChange={onChangeInput}
						className={`${errors?.quantity ? "border-red-600" : ""}`}
					/>
					{errors?.quantity && (
						<p className="text-red-600 text-xs font-semibold">
							{errors.quantity}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<label
						htmlFor="image"
						className={`w-full h-64 bg-white rounded-xl flex justify-center items-center ${
							errors?.color ? "border-red-600" : ""
						}`}
					>
						<input
							type="file"
							className="sr-only "
							id="image"
							onChange={onChangeImage}
							multiple
						/>
						<div className="flex flex-col gap-4">
							<FaRegImage size={200} className="text-gray-300 " />
							<span className="font-semibold text-2xl text-gray-400 font-sans">
								Download images
							</span>
						</div>
					</label>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 grid-cols-1">
						{data.images.map((item, index) => {
							return (
								<div
									key={index}
									className="rounded-lg shadow border border-gray-300 overflow-hidden"
								>
									<img src={URL.createObjectURL(item)} alt={`img` + index} />
								</div>
							);
						})}
						{errors?.images && (
							<p className="text-red-600 text-xs font-semibold">
								{errors.images}
							</p>
						)}
					</div>
				</div>
				<button className="hover:bg-green-800 bg-green-700 text-slate-50 px-8 py-3 mt-5 rounded-md w-fit">
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
