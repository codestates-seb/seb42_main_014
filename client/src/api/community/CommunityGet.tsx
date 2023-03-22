import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export const CommunityGet = async () => {
	try {
		const response = await axios.get(apiUrl + "groups'", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data.body.data;
	} catch (error) {
		console.error(error);
	}
};
