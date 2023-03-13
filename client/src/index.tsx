import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyPage from "./pages/MyPage";
import Volunteer from "./pages/volunteer/Volunteer";
import VolunteerPost from "./pages/volunteer/VolunteerPost";
import Login from "./pages/Sign/Login";
import SignUp from "./pages/Sign/SignUp";

import Community from "./pages/community/Community";
import UserEdit from "./pages/Sign/UserEdit";
import CompanyEdit from "./pages/Sign/CompanyEdit";
import VolunteerDetail from "./pages/volunteer/VolunteerDetail";

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
				path: "/useredit",
				element: <UserEdit />,
			},
			{
				path: "/companyedit",
				element: <CompanyEdit />,
			},
			{
				path: "/volunteer",
				element: <Volunteer />,
			},
			{
				path: "/volunteer/:id",
				element: <VolunteerDetail />,
			},
			{
				path: "/community",
				element: <Community />,
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
		],
		errorElement: <div>에러가 발생했어요!</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<RouterProvider router={router} />,
);
