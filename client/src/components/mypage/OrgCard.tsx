import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useNavigate } from "react-router-dom";
import { Check } from "../../api/mypage/PassWordCheck";

const ProfileImageContainer = styled.div`
	border-radius: 50%;
	img {
		width: 130px;
		border-radius: 50%;
		height: 130px;
	}
`;
const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	width: 100%;
	box-shadow: 0px 0px 10px 1px #dbdbdb;
	border-radius: 10px;
	padding: 20px 40px;
	margin-bottom: 30px;
	justify-content: center;
	& > div {
		display: flex;
		flex-direction: column;
	}
`;
const ImgDiv = styled.div`
	align-items: center;

	button {
		color: #ffffff;
		background-color: #000000;
		border-radius: 30px;
		padding: 5px 30px;
	}
`;

const Login = styled.input`
	align-items: center;
	width: fit-content;
	border-style: none;
	:focus {
		outline: none;
	}
	border-bottom: 3px solid black;

	::placeholder {
		color: black;
		font-weight: 900;
		font-size: 1.15rem;
	}
`;
const Flex = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;

	align-items: center;
	button {
		color: #ffffff;
		background-color: #000000;
		border-radius: 30px;
		padding: 5px;
		width: 100%;
	}
`;

const InfoDiv = styled.div`
	display: flex;
	margin-left: 50px;
	flex-direction: column;
	margin-top: 30px;
	height: 70%;
	justify-content: space-evenly;
	div {
		font-size: 1.2rem;
	}
`;

export default function Orgcard() {
	const [isOpen, setisOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [password, isPassword] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [orgInfo, setOrgInfo] = useState<any>({});

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet("members/me");
			setOrgInfo(result.data);
			setEmail(result.data.email);
			setName(result.data.memberName);
		};
		fetchData();
	}, []);

	const toggle = () => {
		setisOpen(!isOpen);
	};
	const navigate = useNavigate();
	const check = async () => {
		const result = await Check({ password: password });
		if (result === true) {
			toggle();
			navigate("/companyedit", {
				state: {
					orgInfo,
				},
			});
		} else {
			setMessage("비밀번호를 확인해주세요.");
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage("");
		isPassword(event.target.value);
	};
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			check();
		}
	};

	return (
		<>
			<Container>
				<ImgDiv>
					<ProfileImageContainer>
						<img
							src={orgInfo.profileImage ? orgInfo.profileImage : "/images/mypage/profile-user.png"}
							alt="프로필이미지"
						/>
					</ProfileImageContainer>
					<button type="button" onClick={toggle}>
						수정하기
					</button>
				</ImgDiv>
				<div>
					<InfoDiv>
						<div>이름:{name}</div>
						<div>이메일:{email}</div>
					</InfoDiv>
				</div>
			</Container>
			<Modal isOpen={isOpen} toggle={toggle}>
				<h1>패스워드 확인</h1>
				<Login
					type="password"
					onChange={handleInputChange}
					placeholder="패스워드"
					onKeyDown={handleKeyDown}
				></Login>
				{message}
				<Flex>
					<button type="button" onClick={check}>
						확인
					</button>
				</Flex>
			</Modal>
		</>
	);
}
