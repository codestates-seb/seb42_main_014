import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export const GropPost = (params: string, Data: any) => {
	axios
		.post(apiUrl + params, Data, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		})
		.catch(() => {});
};
