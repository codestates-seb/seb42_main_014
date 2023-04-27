import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

type Props = {
	password: string;
};

export const Check = async ({ password }: Props) => {
	try {
		const response = await axios.get(`${apiUrl}/members/me/checkPwd?checkPassword=${password}`, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
