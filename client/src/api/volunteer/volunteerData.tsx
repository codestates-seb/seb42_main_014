import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export const volunteerDataGet = async (params: string) => {
	try {
		const response = await axios.get(apiUrl + params, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		console.log(response.data);
		return response.data.body.data;
	} catch (error) {
		console.error(error);
	}
};

export const volunteerDataPost = (url: string, loginData: any) => {
	axios
		.post(`${apiUrl}${url}`, loginData, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};

export const volunteerCommentPost = (params: string, Data: any) => {
	axios
		.post(apiUrl + params, Data, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};
