import { Helmet } from "react-helmet";

export default function Meta({ title }) {
	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>{title}</title>
		</Helmet>
	);
}
