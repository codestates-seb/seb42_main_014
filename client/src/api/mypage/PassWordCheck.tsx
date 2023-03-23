import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";
type Props = {
	password: string;
};

export const Check = async ({ password }: Props) => {
	try {
		const response = await axios.get(apiUrl + `members/me/checkPwd?checkPassword=${password}`, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
