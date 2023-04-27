import axios from "axios";

const instance = axios.create({
	baseURL: "http://3.34.75.149:8080",
	headers: { Authorization: `${localStorage.getItem("accessToken")}` },
});

export default instance;
