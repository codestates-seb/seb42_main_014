import { useState } from "react";
import styled from "styled-components";
import ImgUpload from "../../components/ImgUpload";
import Modal from "../../components/Modal";

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

const Login = styled.div`
	display: flex;
	justify-content: space-between;

	width: 100%;
	min-width: 300px;
	span {
		margin-right: 30px;
		font-size: 0.9rem;
		margin-left: 15px;
	}
	input {
		border-style: none;
		:focus {
			outline: none;
		}
		::placeholder {
			color: black;
			font-weight: 900;
			font-size: 1.15rem;
		}
	}
	border-bottom: 3px solid black;
	margin-bottom: 35px;
	color: black;
	font-weight: 900;
	font-size: 1.15rem;
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

	return (
		<Body>
			<StyledContainer>
				<EditForm>
					<Header>EDIT</Header>
					<Profile>
						<ImgUpload modal={toggle} />
						<LabelFlex>
							<label htmlFor="profileImg">이미지 업로드</label>
							<label htmlFor="delteImg">이미지 삭제</label>
						</LabelFlex>
					</Profile>
					<Login>
						<input placeholder="이메일"></input>
					</Login>
					<Login>
						<input placeholder="패스워드"></input>
					</Login>
					<Login>
						<input placeholder="패스워드 확인"></input>
					</Login>
					<Login title="수정권한이 없습니다. 회사 기본 정보 수정을 원하신다면 문의 부탁드립니다.">
						상호명<span>이곳에 불러옵니다.</span>
					</Login>
					<Login title="수정권한이 없습니다. 회사 기본 정보 수정을 원하신다면 문의 부탁드립니다.">
						사업장 주소
						<span>이곳에 불러옵니다.</span>
					</Login>

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
