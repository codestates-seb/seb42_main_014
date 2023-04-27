import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

interface ILoginUser {
	email: string;
	password: string;
	memberName?: string;
	companyName?: string;
	address?: string;
	businessNumber?: number;
}

export const signUpUserInfoPost = (loginData: ILoginUser) => {
	axios.post(`${apiUrl}/members/register`, loginData).catch((err) => console.log(err));
};
