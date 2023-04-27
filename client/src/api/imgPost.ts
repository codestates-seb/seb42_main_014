import axios from "axios";

export const imageUploadPost = (
	fileSrc: string,
	setState: React.Dispatch<React.SetStateAction<string>>,
) => {
	const formData = new FormData();
	formData.append("profile", fileSrc);
	axios({
		headers: {
			"Content-Type": "multipart/form-data",
		},
		url: "http://3.34.75.149:8080/images",
		method: "POST",
		data: formData,
	})
		.then((res) => setState(res.data))
		.catch((err) => console.log(err));
};
