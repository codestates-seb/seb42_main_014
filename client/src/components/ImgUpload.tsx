import React, { useState } from "react";

interface Iprops {
	modal: any;
	onImageChange: (src: string) => void;
}

function UploadFile({ modal, onImageChange }: Iprops) {
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
		// URL.revokeObjectURL(file);
		setFile("https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png");
		onImageChange("");
		// 렌더링 이미지 기본값으로 변경
	};

	return (
		<div>
			<input id="profileImg" type="file" onChange={handleChange}></input>
			<input id="delteImg" onClick={onImageRemove}></input>
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
