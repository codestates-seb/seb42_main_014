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
