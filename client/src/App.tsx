import "./App.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/layouts/Nav";
import Footer from "./components/layouts/Footer";

export default function App() {
	return (
		<>
			<Nav />
			<Outlet />
			<a id="chat-channel-button" href="javascript:chatChannel()">
				<img src="/images/consult_small_yellow_pc.png" alt="카카오톡 채널 채팅하기 버튼" />
			</a>
			<Footer />
		</>
	);
}
