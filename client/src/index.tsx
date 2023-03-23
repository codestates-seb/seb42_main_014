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
import VolunteerDetail from "./pages/volunteer/VolunteerDetail";
import ErrorPage from "./pages/ErrorPage";
import CommunityDetail from "./pages/community/CommunityDetail";
import Test from "./pages/recommend/Test";
import Token from "./pages/token";

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
				element: <UserEdit />,
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
				path: "/grouppost",
				element: <VolunteerPost />,
			},

			{
				path: "/community/:id",
				element: <CommunityDetail />,
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
				path: "/test",
				element: <Test />,
			path: "/token",
				element: <Token />,
			},
		],
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<RouterProvider router={router} />,
);
