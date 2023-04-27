import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const CommentDelete = async (params: string) => {
	await axios
		.delete(`${apiUrl}/${params}`, {
			headers: {
				Authorization: ` ${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};
