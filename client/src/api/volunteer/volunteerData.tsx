import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export const volunteerDataGet = async (params: string) => {
	try {
		const response = await axios.get(apiUrl + params, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data.body.data;
	} catch (error) {
		console.error(error);
	}
};
