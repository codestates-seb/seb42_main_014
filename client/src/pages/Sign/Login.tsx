import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { KAKAO_AUTH_URL } from "../../data/KakaoLoginData";

const Body = styled.body`
	height: 100vh;
	margin-top: -80px;
	width: 100%;
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
	margin-bottom: 15px;
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
const ErrorMsg = styled.div`
	color: red;
	margin-bottom: 10px;
	font-size: 13px;
`;

export default function LoginPage() {
	const apiUrl = "http://3.35.252.234:8080/";
	const navigate = useNavigate();
	const [isError, setIsError] = useState(false);
	const [user, setUser] = useState(null); // 유저 정보를 담을 상태 변수
	interface ILoginUser {
		email: string;
		password: string;
	}
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginUser>({ mode: "onSubmit" });

	const LoginUserInfoPost = (loginData: ILoginUser) => {
		axios
			.post(apiUrl + "login", loginData, {
				withCredentials: true,
			})
			.then((res) => {
				const token = res.headers.authorization;
				const reToken = res.headers.refresh;
				localStorage.setItem("accessToken", token);
				localStorage.setItem("refreshToken", reToken);
				setUser(token);
				navigate("/loading");
			})
			.catch((err) => console.log("오류!", err));
	};

	const onSubmit = (data: ILoginUser) => {
		LoginUserInfoPost(data);
	};

	const kakaoHandler = () => {
		return window.location.assign(KAKAO_AUTH_URL);
	};

	return (
		<Body>
			<form onSubmit={handleSubmit(onSubmit)}>
				<StyledContainer>
					<LoginForm>
						<LoginHeader>Login</LoginHeader>
						<Login
							{...register("email", {
								required: "이메일은 필수 입력 사항입니다.",
							})}
							placeholder="Email"
						></Login>
						{errors.email && <ErrorMsg>{errors.email?.message}</ErrorMsg>}
						<Login
							{...register("password", {
								required: "비밀번호는 필수 입력 사항입니다.",
							})}
							placeholder="Password"
							type={"password"}
						></Login>
						{errors.password && <ErrorMsg>{errors.password?.message}</ErrorMsg>}
						<LoginBtn type="submit">로그인</LoginBtn>
						{isError && <ErrorMsg>로그인 정보가 잘못되었어요. 다시한번 확인해 주세요!</ErrorMsg>}
						<Flex>
							<span>이메일/비밀번호 찾기</span>
							<Link to="/signup">회원가입</Link>
						</Flex>
					</LoginForm>
					<KakaoBtn onClick={kakaoHandler} src="/images/kakao_login_medium.png" alt="main-logo" />
				</StyledContainer>
			</form>
		</Body>
	);
}
