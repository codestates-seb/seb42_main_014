import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export const myPageGet = async () => {
	try {
		const response = await axios.get(apiUrl + "members/5");
		return response.data.body.data;
	} catch (error) {
		console.error(error);
	}
};
