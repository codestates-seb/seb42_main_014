import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useNavigate } from "react-router-dom";
import { Check } from "../../api/mypage/PassWordCheck";

const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	width: 100%;
	box-shadow: 0px 0px 10px 1px #dbdbdb;
	border-radius: 10px;
	padding: 20px 40px;
	margin-bottom: 30px;
	justify-content: space-between;
	& > div {
		/* ImgDiv, InfoDiv 공통 */
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

	img {
		width: 64px;
	}
`;
// const LikeSpan = styled.span`
// 	width: 85px;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;

// 	img {
// 		width: 32px;
// 		height: 32px;
// 	}

// 	span {
// 		font-weight: bold;
// 	}
// `;
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
	flex-direction: column;
	justify-content: center;
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
	const [orgInfo, setOrgInfo] = useState("");

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

	return (
		<>
			<Container>
				<ImgDiv>
					<div>
						<img src="/images/mypage/user.png" alt="프로필이미지" />
					</div>
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
				<Login type="password" onChange={handleInputChange} placeholder="패스워드"></Login>
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
