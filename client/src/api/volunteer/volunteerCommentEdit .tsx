import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";
export const CommentEdit = async (params: string, Data: any) => {
	await axios
		.patch(`${apiUrl}${params}`, Data, {
			headers: {
				Authorization: ` ${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};
