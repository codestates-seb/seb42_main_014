import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Volunteer from "./pages/Volunteer";
import Donation from "./pages/Donation";
import About from "./pages/About";
import MyPage from "./pages/MyPage";

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
		],
		errorElement: <div>에러가 발생했어요!</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<RouterProvider router={router} />,
);
