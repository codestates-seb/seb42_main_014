import { useState } from "react";
import styled from "styled-components";
import ImgUpload from "../../components/ImgUpload";
import Modal from "../../components/Modal";
import axios from "axios";

const Body = styled.body`
	height: 100vh;
	width: 100%;
	position: fixed;
`;
const StyledContainer = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const EditForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: fit-content;
	padding-bottom: 20px;
`;

const Login = styled.input`
	width: 100%;
	min-width: 300px;
	border-style: none;
	:focus {
		outline: none;
	}
	border-bottom: 3px solid black;
	margin-bottom: 35px;
	::placeholder {
		color: black;
		font-weight: 900;
		font-size: 1.15rem;
	}
`;
const Btn = styled.button`
	width: 100%;
	cursor: pointer;
	color: white;
	font-size: 1.3rem;
	font-weight: bold;
	background-color: black;
	margin-bottom: 30px;
	margin-top: 20px;
	padding: 0.5rem;
`;

const Profile = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	input {
		display: none;
	}
	label {
		margin: 5px 0 20px 0;
		font-weight: bold;
		font-size: 13px;
		color: #001624;
		display: inline-block;
		cursor: pointer;
	}
	label:hover {
		color: #003a9f;
	}
	label:hover:last-child {
		color: red;
	}
	img {
		cursor: pointer;
		width: 130px;
		height: 130px;
		border: 2px solid gray;
		border-radius: 50%;
		margin-right: 30px;
		margin-bottom: 30px;
	}
`;
const Header = styled.h1`
	font-size: 3rem;
`;
const ImgView = styled.div`
	img {
		width: 100%;
		height: 100%;
	}
`;
const LabelFlex = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function UserEdit() {
	const [imageSrc, setImageSrc] = useState("");
	console.log(imageSrc);

	const handleImageChange = (src: string) => {
		setImageSrc(src);
	};

	const [isOpen, setisOpen] = useState(false);
	const [isEmage, setisEmage] = useState<boolean | any>(false);
	const imgSrc = isEmage.src;
	const toggle = (event: any) => {
		setisOpen(!isOpen);
		click(event);
	};
	const click = (event: { currentTarget: any }) => {
		let clickEmg = event.currentTarget;
		setisEmage(clickEmg);
	};

	const apiUrl = "http://3.35.252.234:8080/";

	async function Volpatch(id: string): Promise<void> {
		const url = `${apiUrl}${id}`;
		try {
			const response = await axios.patch(url);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Body>
			<StyledContainer>
				<EditForm>
					<Header>EDIT</Header>
					<Profile>
						<ImgUpload modal={toggle} onImageChange={handleImageChange} />
						<LabelFlex>
							<label htmlFor="profileImg">이미지 업로드</label>
							<label htmlFor="delteImg">이미지 삭제</label>
						</LabelFlex>
					</Profile>
					<Login placeholder="이메일"></Login>
					<Login placeholder="패스워드"></Login>
					<Login placeholder="패스워드 확인"></Login>
					<Login placeholder="닉네임"></Login>

					<Btn>저장하기</Btn>
				</EditForm>
			</StyledContainer>
			<ImgView>
				<Modal isOpen={isOpen} toggle={toggle}>
					<img src={imgSrc} alt=""></img>
				</Modal>
			</ImgView>
		</Body>
	);
}
