import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const CommunityGet = async () => {
	try {
		const response = await axios.get(`${apiUrl}/groups`, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data.body.data;
	} catch (error) {
		console.error(error);
	}
};
