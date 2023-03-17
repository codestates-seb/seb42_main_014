import { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";

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
	justify-content: center;
	& > div {
		font-size: 1.2rem;
	}
`;

export default function Orgcard() {
	const [isOpen, setisOpen] = useState(false);
	const toggle = () => {
		setisOpen(!isOpen);
	};
	return (
		<>
			<Container>
				<ImgDiv>
					{/* 프로필이미지와 수정버튼 */}
					<div>
						{/* 프로필이미지 */}
						<img src="/images/mypage/user.png" alt="프로필이미지" />
					</div>
					<button type="button" onClick={toggle}>
						수정하기
					</button>
				</ImgDiv>
				{/* <LikeSpan>
					<img src="/images/mypage/like.png" alt="찜하기" />
					<span>1,004</span>
				</LikeSpan> */}
				<InfoDiv>
					{/* 프로필 정보 */}
					<div>이름 : 봉사기관</div>
					<div>이메일 : abcdef@gmail.com</div>
				</InfoDiv>
			</Container>
			<Modal isOpen={isOpen} toggle={toggle}>
				<h1>패스워드 확인</h1>

				<Login placeholder="패스워드"></Login>
				<Login placeholder="패스워드 확인"></Login>
				<Flex>
					<button type="button" onClick={toggle}>
						확인
					</button>
				</Flex>
			</Modal>
		</>
	);
}
