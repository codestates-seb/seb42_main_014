import { useState } from "react";
import styled from "styled-components";
import ImgUpload from "../../components/ImgUpload";
import Modal from "../../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userInfoPatch } from "../../api/mypage/VolunteerPatch";

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
	margin-bottom: 20px;
	::placeholder {
		color: #3d3d3d;
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

const ErrorMsg = styled.div`
	color: red;
	text-align: center;
	margin-bottom: 20px;
`;

export default function UserEdit() {
	const [isOpen, setIsOpen] = useState(false);
	const [isImage, setIsImage] = useState<boolean | any>(false);
	const [file, setFile] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const imgSrc = isImage.src;
	const toggle = (event: any) => {
		setIsOpen(!isOpen);
		click(event);
	};
	const click = (event: { currentTarget: any }) => {
		let clickImg = event.currentTarget;
		setIsImage(clickImg);
	};
	const location = useLocation();
	const { email, name, orgInfo } = location.state;
	const apiUrl = "http://3.35.252.234:8080/";
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const pathName = window.location.pathname;

	const submitData = (data: any) => {
		const newPatchMemberData = {
			profileImage: file || null,
			memberName: data.memberName || null,
			password: data.password || null,
		};
		userInfoPatch("members/me", newPatchMemberData);
		navigate("/mypage");
	};

	return (
		<Body>
			<StyledContainer>
				<form onSubmit={handleSubmit(submitData)}>
					<EditForm>
						<Header>EDIT</Header>
						<Profile>
							<ImgUpload
								modal={toggle}
								onImageChange={function (src: string): void {
									throw new Error("Function not implemented.");
								}}
							/>
							<LabelFlex>
								<label htmlFor="profileImg">이미지 업로드</label>
								<label htmlFor="deleteImg">이미지 삭제</label>
							</LabelFlex>
						</Profile>
						{/* <Login className="readOnly" placeholder="이메일" value={email} readOnly /> */}
						<Login
							placeholder="닉네임"
							{...register("memberName", {
								pattern: {
									value: /^[a-z]{1,8}$/,
									message: "8자리 영어 소문자로 입력해주세요.",
								},
							})}
							maxLength={8}
						/>
						{errors.memberName && <ErrorMsg>영어 소문자만 가능해요.</ErrorMsg>}
						<Login
							placeholder="변경 비밀번호"
							type="password"
							{...register("password", {
								pattern: {
									value: /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,50}$/,
									message: "8자리 이상 소문자+숫자+특수문자 조합이예요.",
								},
							})}
							minLength={8}
							maxLength={50}
						/>
						{errors.password && <ErrorMsg>8자리 이상 소문자+숫자+특수문자 조합이예요.</ErrorMsg>}
						<Login
							placeholder="변경 비밀번호 확인"
							type="password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{getValues("password") !== confirmPassword && confirmPassword ? (
							<ErrorMsg>동일한 비밀번호를 입력해주세요.</ErrorMsg>
						) : null}
						{pathName === "/companyedit" ? (
							<EditForm>
								<ErrorMsg>사업자 관련 정보를 변경하시려면 상담톡으로 문의주세요.</ErrorMsg>
							</EditForm>
						) : null}
						<Btn>저장하기</Btn>
					</EditForm>
				</form>
			</StyledContainer>
			<ImgView>
				<Modal isOpen={isOpen} toggle={toggle}>
					<img src={imgSrc} alt="" />
				</Modal>
			</ImgView>
		</Body>
	);
}
