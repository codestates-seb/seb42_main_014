import { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal";

const Body = styled.body`
	height: 100vh;
	width: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`;
const StyledContainer = styled.div`
	/* position: absolute; */
	/* top: 40%;
	left: 50%;
	transform: translate(-50%, -50%); */
	/* display: flex;
	flex-direction: column; */
`;
const LoginForm = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	/* align-items: center; */
	width: fit-content;
	height: max-content;
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

const Radio = styled.div`
	label {
		font-size: 18px;
		line-height: 3rem;
		padding: 0.3em 0.4em;
		margin: 10px;
	}
	[type="radio"] {
		vertical-align: middle;
		appearance: none;
		border: max(3px, 0.1em) solid gray;
		border-radius: 50%;
		width: 1.7em;
		height: 1.7em;
		transition: border 0.2s ease-in-out;
		margin-right: 9px;
	}

	[type="radio"]:checked {
		border-color: transparent;
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-color: #242424;
	}

	[type="radio"]:focus-visible {
		outline-offset: max(5px, 1em);
		outline: max(5px, 1em) dotted tomato;
	}

	[type="radio"]:hover {
		cursor: pointer;
	}

	[type="radio"]:disabled {
		background-color: lightgray;
		box-shadow: none;
		opacity: 0.7;
		cursor: not-allowed;
	}

	[type="radio"]:disabled + span {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;
const CheckBox = styled.div`
	[type="Checkbox"] {
		vertical-align: middle;
		appearance: none;
		border: max(3px, 0.1em) solid gray;
		border-radius: 10%;
		width: 1.3em;
		height: 1.3em;
		transition: border 0.2s ease-in-out;
	}

	[type="Checkbox"]:checked {
		border-color: transparent;
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-color: #242424;
	}
`;
const Flex = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	flex-direction: row;
	margin: 10px 0px;
	> span {
		margin: 10px;
		font-size: small;
	}
	> span:last-child {
		color: red;
		font-weight: 600;
		cursor: pointer;
	}
`;
const FlexClo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;
const SignUpHeader = styled.div`
	display: flex;
	top: 45px;
	position: absolute;
	flex-direction: column;
	align-items: center;
`;

export default function SignUp() {
	const [isOpen, setisOpen] = useState(false);

	const [isUser, setisUser] = useState<boolean>(true);

	const toggle = () => {
		setisOpen(!isOpen);
	};
	const User = () => {
		setisUser(false);
	};
	const Company = () => {
		setisUser(true);
	};

	return (
		<Body>
			<SignUpHeader>
				<LoginHeader>SignUp</LoginHeader>
				<Radio>
					<label>
						<input onClick={User} type="radio" name="contact" value="person" />
						<span>개인</span>
					</label>

					<label>
						<input onClick={Company} type="radio" name="contact" value="corporate" />
						<span>봉사단체</span>
					</label>
				</Radio>
			</SignUpHeader>
			<StyledContainer>
				<LoginForm>
					<Login placeholder="이메일"></Login>
					<Login placeholder="패스워드"></Login>
					<Login placeholder="패스워드 확인"></Login>
					<Login placeholder={isUser ? "상호명" : "닉네임"}></Login>
					{isUser ? (
						<div>
							<Login placeholder="사업장 주소"></Login>
							<Login placeholder="사업자 등록 번호"></Login>
						</div>
					) : null}

					<Flex>
						<span>약관동의</span>
						<CheckBox>
							<input type="Checkbox" />
						</CheckBox>
						<span>정보 수집 및 이용 동의 (필수)</span>
						<span onClick={toggle}>내용보기</span>
					</Flex>

					<Btn>회원가입</Btn>
				</LoginForm>
			</StyledContainer>
			<Modal isOpen={isOpen} toggle={toggle}>
				<FlexClo>
					<div>
						<h2>개인정보 이용에 대한 안내</h2>
						<p>[개인정보 보호법] 제21조에 따라 처리합니다.</p>{" "}
						<p>본인은 개인정보 수집 및 이용에 대하여 동의합니다.</p>{" "}
						<p>본인은 고유식별정보 수집에 동의합니다.</p>※ 귀하는 개인정보 및 고유식별정보 수집에
						대한 동의를 거부할 권리가 있습니다.
					</div>
					<Btn onClick={toggle}>확인</Btn>
				</FlexClo>
			</Modal>
		</Body>
	);
}
