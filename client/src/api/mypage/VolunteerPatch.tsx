import axios from "axios";

const apiUrl = "http://3.35.252.234:8080/";

export async function Volpatch(id: string): Promise<void> {
	const url = `${apiUrl}${id}`;
	try {
		const response = await axios.patch(url);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

export const userInfoPatch = (path: string, patchData: any) => {
	axios
		.patch(`${apiUrl}${path}`, patchData, {
			headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
		})
		.catch((err) => console.log(err));
};
