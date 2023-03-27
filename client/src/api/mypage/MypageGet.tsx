import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export const myPageGet = async (params: string) => {
	try {
		const response = await axios.get(apiUrl + params, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data.body;
	} catch (error) {
		console.error(error);
	}
};
export const myPageGet2 = async (params: string) => {
	try {
		const response = await axios.get(apiUrl + params, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data.body;
	} catch (error) {
		console.error(error);
	}
};

export const guestGetData = async (params: string) => {
	try {
		const response = await axios.get(apiUrl + params);
		return response.data.body;
	} catch (error) {
		console.error(error);
	}
};

export const memberDelete = async (params: string) => {
	try {
		const response = await axios.delete(apiUrl + params, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data.body;
	} catch (error) {
		console.error(error);
	}
};
