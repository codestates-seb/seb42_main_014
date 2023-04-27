import axios from "axios";

const apiUrl = "http://3.35.252.234:8080";

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
