// import axios from "axios";
import axios from "../axiosInstance";

const apiUrl = process.env.REACT_APP_SERVER_URL;

interface IGroupPostData {
	groupId: number;
}

export const GroupPost = (params: string, data: IGroupPostData) => {
	axios
		.post(`${apiUrl}/${params}`, data, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		})
		.catch(() => {});
	// axios.post("/volunteers", data);
};
