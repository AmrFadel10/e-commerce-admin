export default function CustomInput(props) {
	const { placeholder, type, id, className, name, register } = props;
	const registerfound = () => {
		if (register) {
			return register(name);
		} else {
			return null;
		}
	};
	return (
		<input
			placeholder={placeholder}
			type={type}
			id={id}
			className={`${className} my-2 p-3 bg-white text-gray-600 focus:outline-none  w-full border focus:border-gray-400 rounded-lg border-gray-300`}
			{...registerfound()}
		/>
	);
}
export function CustomInput1(props) {
	const {
		placeholder,
		type,
		id,
		className,
		name,
		onChange,
		defaultValue,
		value,
	} = props;

	return (
		<input
			placeholder={placeholder}
			type={type}
			id={id}
			className={`${className} my-2 p-3 bg-white text-gray-600 focus:outline-none  w-full border focus:border-gray-400 rounded-lg border-gray-300`}
			name={name}
			onChange={onChange}
			defaultValue={defaultValue}
			value={value}
		/>
	);
}
