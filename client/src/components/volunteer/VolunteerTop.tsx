import { useRef, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
const Body = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
const Left = styled.div`
	box-sizing: content-box;

	cursor: pointer;
	input {
		display: none;
	}
	background-color: #ffffff;
	height: fit-content;
	border: 3px solid black;
	width: 500px;
	height: 400px;
	img {
		width: 500px;
		height: 400px;
	}
`;
const Right = styled.div`
	padding: 15px;
	display: flex;
	margin-left: 20px;
	margin-bottom: 20px;
	justify-content: center;
	flex-direction: column;
`;

export default function VolunteerPost() {
	const fileInput = useRef<HTMLLabelElement>(null);
	const onChangeHandler = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	};

	const Select = styled.div`
		display: flex;
		align-items: center;
		padding-bottom: 5px;
		margin-top: 5px;
		margin-bottom: 5px;
		border-bottom: 3px solid black;
		height: max-content;
		span {
			font-weight: 900;
			margin-right: 15px;
			font-size: 1.35rem;
		}
		span:nth-child(3) {
			font-weight: 700;
			margin-right: 15px;
			margin-left: 15px;
			font-size: 1.1rem;
		}
		input {
			border: none;
			font-size: 1rem;
			:focus {
				outline: none;
			}
		}
	`;
	const [file, setFile] = useState<string>("");
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const selectedFiles = event.target.files as FileList;
			setFile(URL.createObjectURL(selectedFiles?.[0]));
		}
	};
	return (
		<Body>
			<Container>
				<Left onClick={onChangeHandler}>
					<input id="profileImg" type="file" onChange={handleChange}></input>
					<img src={file ? file : "https://www.namepros.com/attachments/empty-png.89209/"} alt="" />
					<label htmlFor="profileImg" ref={fileInput}></label>
				</Left>
				<Right>
					<Select>
						<span>활동명 </span>
						<input type="text" />
					</Select>
					<Select>
						<span>봉사분야 </span>
						<Dropdown />
					</Select>
					<Select>
						<span>모집기간 </span>
						<input type="date" />
						<span> 부터 </span>
						<input type="date" />
					</Select>
					<Select>
						<span>봉사일시 </span>
						<input type="date" />
						<span>시간</span>
						<input style={{ width: "136px" }} type="time" />
					</Select>
					<Select>
						<span>활동시간 </span>
						<input style={{ width: "60px" }} type="number" />
						시간
					</Select>
					<Select>
						<span>봉사장소 </span>
						<input type="text" />
					</Select>
					<Select>
						<span>모집인원 </span>
						<input style={{ width: "60px" }} type="number" />명
					</Select>
				</Right>
			</Container>
		</Body>
	);
}
