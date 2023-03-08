import { Link } from "react-router-dom";
import styled from "styled-components";

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
const LoginForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 300px;
	padding-bottom: 20px;
	border-bottom: solid 1px black;
`;
const LoginHeader = styled.h1`
	font-size: 3rem;
`;
const Login = styled.input`
	width: 100%;
	border-style: none;
	:focus {
		outline: none;
	}
	border-bottom: 3px solid black;
	margin-bottom: 25px;
	::placeholder {
		color: black;
		font-weight: 900;
		font-size: 1.15rem;
	}
`;
const LoginBtn = styled.button`
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
const KakaoBtn = styled.img`
	cursor: pointer;
	margin-top: 30px;
	width: 80px;
`;
const Flex = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
	flex-direction: row;
	> span {
		cursor: pointer;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
`;

export default function Home() {
	return (
		<Body>
			<StyledContainer>
				<LoginForm>
					<LoginHeader>Login</LoginHeader>
					<Login placeholder="Email"></Login>
					<Login placeholder="Password"></Login>
					<LoginBtn>로그인</LoginBtn>
					<Flex>
						<span>이메일/비밀번호 찾기</span>
						<Link to="/signup">회원가입</Link>
					</Flex>
				</LoginForm>
				<KakaoBtn src="/images/kakao_login_medium.png" alt="main-logo"></KakaoBtn>
			</StyledContainer>
		</Body>
	);
}
