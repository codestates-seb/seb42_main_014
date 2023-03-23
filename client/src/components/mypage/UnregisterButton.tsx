import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { memberDelete } from "../../api/mypage/MypageGet";

const Button = styled.button`
	color: #ffffff;
	background-color: #000000;
	border-radius: 30px;
	padding: 5px 30px;
`;

export default function UnregisterButton() {
	const navigate = useNavigate();
	const handleMemberDeleteClick = () => {
		if (window.confirm("정말 탈퇴하시겠어요? 모든 자료는 복구되지 않아요.")) {
			memberDelete("members/me").then((res) => localStorage.removeItem("accessToken"));
			navigate("/");
		} else {
			alert("잘 생각하셨어요! 오래오래 저희랑 봉사해요:)");
		}
	};
	return <Button onClick={handleMemberDeleteClick}>회원탈퇴</Button>;
}
