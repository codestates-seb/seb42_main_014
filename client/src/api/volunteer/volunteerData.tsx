import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const volunteerDataGet = async (params: string) => {
	try {
		const response = await axios.get(`${apiUrl}/${params}`, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});

		return response.data.body;
	} catch (error) {
		console.error(error);
	}
};

export const volunteerDataPost = async (url: string, loginData: any) => {
	await axios.post(`${apiUrl}/${url}`, loginData, {
		headers: {
			Authorization: `${localStorage.getItem("accessToken")}`,
		},
	});
};

export const volunteerCommentPost = async (params: string, Data: any) => {
	await axios
		.post(`${apiUrl}/${params}`, Data, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		})
		.catch(() => {
			alert("봉사기간 이후 작성 가능합니다.");
		});
};
