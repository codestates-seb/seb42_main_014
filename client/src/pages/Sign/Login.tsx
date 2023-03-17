import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
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
	interface ILoginUser {
		email: string;
		password: string;
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginUser>({ mode: "onSubmit" });

	const LoginUserInfoPost = (loginData: ILoginUser) => {
		axios
			.post("http://3.35.252.234:8080/login", {
				loginData,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const onSubmit = (data: ILoginUser) => {
		LoginUserInfoPost(data);
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
						<Flex>
							<span>이메일/비밀번호 찾기</span>
							<Link to="/signup">회원가입</Link>
						</Flex>
					</LoginForm>
					<KakaoBtn src="/images/kakao_login_medium.png" alt="main-logo" />
				</StyledContainer>
			</form>
		</Body>
	);
}