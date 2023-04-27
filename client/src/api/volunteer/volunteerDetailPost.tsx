import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const volunteerDetailPost = async (params: string) => {
	try {
		const response = await axios.post(`${apiUrl}/${params}`, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data.body;
	} catch (error) {
		console.error(error);
	}
};
