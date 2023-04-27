import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVER_URL;

export async function Volpatch(id: string): Promise<void> {
	const url = `${apiUrl}/${id}`;
	try {
		const response = await axios.patch(url);
	} catch (error) {
		console.error(error);
	}
}

export const userInfoPatch = (path: string, patchData: any) => {
	axios
		.patch(`${apiUrl}/${path}`, patchData, {
			headers: { Authorization: ` ${localStorage.getItem("accessToken")}` },
		})
		.catch((err) => console.log(err));
};
