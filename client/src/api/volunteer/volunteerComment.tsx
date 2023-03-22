import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";
export const CommentDelete = (params: string) => {
	axios
		.delete(apiUrl + params, {
			headers: {
				Authorization: `${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};
