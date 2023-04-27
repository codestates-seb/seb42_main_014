import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const CommentEdit = async (params: string, Data: any) => {
	await axios
		.patch(`${apiUrl}/${params}`, Data, {
			headers: {
				Authorization: ` ${localStorage.getItem("accessToken")}`,
			},
		})
		.catch((err) => console.log(err));
};
