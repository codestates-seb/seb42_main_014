import styled from "styled-components";

const Button = styled.button`
	color: #ffffff;
	background-color: #000000;
	border-radius: 30px;
	padding: 5px 30px;
`;

export default function UnregisterButton() {
	return <Button>회원탈퇴</Button>;
}
