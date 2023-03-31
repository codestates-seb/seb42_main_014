import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { memberDelete } from "../../api/mypage/MypageGet";

interface Iprop {
	name: string;
	quri: string;
	meg: string;
}

const Button = styled.button`
	cursor: pointer;
	color: #ffffff;
	background-color: #000000;
	border-radius: 30px;
	padding: 5px 30px;
`;

export default function UnregisterButton({ quri, name, meg }: Iprop) {
	const navigate = useNavigate();
	const handleMemberDeleteClick = () => {
		if (window.confirm(meg)) {
			memberDelete(quri);
			navigate("/");
		} else {
			alert("잘 생각하셨어요! 오래오래 저희랑 봉사해요:)");
		}
	};
	return <Button onClick={handleMemberDeleteClick}>{name}</Button>;
}
