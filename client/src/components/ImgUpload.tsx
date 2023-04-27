import React, { useState } from "react";

interface Iprops {
	modal: any;
	onImageChange: (src: string) => void;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function UploadFile({ modal, onImageChange, onChange }: Iprops) {
	const [file, setFile] = useState<string>("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const selectedFiles = event.target.files as FileList;
			const fileUrl = URL.createObjectURL(selectedFiles?.[0]);

			setFile(fileUrl);
			onImageChange(fileUrl);
		}
	};

	const onImageRemove = (): void => {
		setFile("https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png");
		onImageChange("");
	};

	return (
		<div>
			<input id="profileImg" type="file" onChange={handleChange}></input>
			<input id="deleteImg" onClick={onImageRemove}></input>
			<img
				src={
					file
						? file
						: "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png"
				}
				alt=""
				onClick={modal}
			/>
		</div>
	);
}
export default UploadFile;
