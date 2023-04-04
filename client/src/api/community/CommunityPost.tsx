// import axios from "axios";
import axios from "../axiosInstance";

const apiUrl = "http://3.35.252.234:8080/";

interface IGroupPostData {
	groupId: number;
}

export const GroupPost = (params: string, data: IGroupPostData) => {
	axios
		.post(apiUrl + params, data, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		})
		.catch(() => {});
	// axios.post("/volunteers", data);
};
