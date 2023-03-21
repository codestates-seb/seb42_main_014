import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export const volunteerDataGet = async () => {
	try {
		const response = await axios.get(apiUrl + "volunteers");
		return response.data.body.data;
	} catch (error) {
		console.error(error);
	}
};

export const volunteerDataPost = (url: string, loginData: any) => {
	axios
		.post(`${apiUrl}${url}`, loginData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};
