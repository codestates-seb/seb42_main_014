import "./App.css";
import { Outlet } from "react-router-dom";

import Nav from "./components/layouts/Nav";
import Footer from "./components/layouts/Footer";

export default function App() {
	return (
		<>
			<Nav />
			<Outlet />
			<Footer />
		</>
	);
}
