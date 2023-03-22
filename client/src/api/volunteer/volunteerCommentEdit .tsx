import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";
export const CommentEdit = (params: string, Data: any) => {
	axios
		.patch(apiUrl + params, Data, {
			headers: {
				Authorization: ` ${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};
