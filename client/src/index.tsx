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
import CommunityPost from "./pages/community/CommunityPost";
import GroupDetail from "./pages/community/GroupDetail";
import ErrorPage from "./pages/ErrorPage";

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
				path: "/post",
				element: <CommunityPost />,
			},

			{
				path: "/community/:id",
				element: <GroupDetail />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/mypage/:id",
				element: <MyPage />,
			},
			{
				path: "/register",
				element: <VolunteerPost />,
			},
		],
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<RouterProvider router={router} />,
);
