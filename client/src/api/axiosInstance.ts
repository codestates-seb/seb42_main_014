import axios from "axios";

const instance = axios.create({
	baseURL: "http://3.35.252.234:8080",
	headers: { Authorization: `${localStorage.getItem("accessToken")}` },
});

export default instance;
