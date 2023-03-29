import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
import { Check } from "../../api/mypage/PassWordCheck";
import Modal from "../MypageModal";

const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	width: 100%;
	box-shadow: 0px 0px 10px 1px #dbdbdb;
	border-radius: 10px;
	padding: 20px 40px;
	margin-bottom: 30px;
	justify-content: center;
	position: relative;
	& > div {
		/* ImgDiv, InfoDiv 공통 */
		display: flex;
		flex-direction: column;
	}
`;
const ImgDiv = styled.div`
	align-items: center;
	margin-right: 40px;
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
const MedalSpan = styled.span`
	position: absolute;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	left: 100px;

	img {
		width: 32px;
		height: 32px;
	}
`;
const InfoDiv = styled.div`
	justify-content: center;
	& > div {
		font-size: 1.2rem;
	}
`;

const ProfileImageContainer = styled.div`
	border-radius: 50%;
	img {
		width: 130px;
		border-radius: 50%;
		height: 130px;
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

export default function Usercard() {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [password, isPassword] = useState("");
	const [getAllData, setGetAllData] = useState<any>({});

	const toggle = () => {
		setIsOpen(!isOpen);
	};
	const navigate = useNavigate();
	const check = async () => {
		const result = await Check({ password: password });
		if (result === true) {
			toggle();
			navigate("/useredit", {
				state: {
					password,
					email,
					memberName,
				},
			});
		} else {
			setMessage("비밀번호를 확인해주세요.");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet("members/me");
			setGetAllData(result.data);
		};
		fetchData();
	}, []);

	const { email, memberName, point, profileImage } = getAllData;

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
							src={profileImage ? profileImage : "/images/mypage/profile-user.png"}
							alt="프로필이미지"
						/>
					</ProfileImageContainer>
					<button type="button" onClick={toggle}>
						수정하기
					</button>
				</ImgDiv>
				<MedalSpan>
					{point >= 15 ? <img src="/images/mypage/medal.png" alt="봉사 뱃지" /> : null}
				</MedalSpan>
				<InfoDiv>
					<div>이름 : {memberName}</div>
					<div>이메일 : {email}</div>
					<div>봉사점수 : {point}점</div>
				</InfoDiv>
			</Container>
			<Modal isOpen={isOpen} toggle={toggle}>
				<h1>패스워드 확인</h1>
				<Login
					type="password"
					onChange={handleInputChange}
					placeholder="패스워드"
					onKeyDown={handleKeyDown}
				/>
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
