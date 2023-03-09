import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyPage from "./pages/MyPage";
import Volunteer from "./pages/volunteer/Volunteer";
import VolunteerPost from "./pages/volunteer/VolunteerPost";
import DonationPost from "./pages/donation/DonationPost";
import Donation from "./pages/donation/Donation";
import Login from "./pages/Sign/Login";
import SignUp from "./pages/Sign/SignUp";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/volunteer",
				element: <Volunteer />,
			},
			{
				path: "/donation",
				element: <Donation />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/mypage",
				element: <MyPage />,
			},
			{
				path: "/register",
				element: <VolunteerPost />,
			},
			{
				path: "/sell",
				element: <DonationPost />,
			},
		],
		errorElement: <div>에러가 발생했어요!</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<RouterProvider router={router} />,
);
