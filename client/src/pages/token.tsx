import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styled from "styled-components";

export default function Token() {
	const navigate = useNavigate();
	if (window.location.pathname === "/token") {
		setTimeout(() => {
			const token = `${window.location.search.split("=")[1]}`;
			localStorage.setItem("accessToken", token);
			navigate("/");
		}, 3000);
	} else {
		setTimeout(() => {
			navigate("/");
		}, 3000);
	}

	const StyledContainer = styled.div`
		background-color: #383838;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		margin-bottom: 100px;

		div {
			padding: 30px;
			color: white;
			font-size: 18px;
		}
	`;
	return (
		<>
			<StyledContainer>
				<HashLoader size={100} color="#1bf094" />
				<div>
					사랑은 그 자체로 머무를 수 없다. 그렇다면 의미가 없다. 사랑은 행동으로 이어져야 하고 그
					행동이 바로 봉사이다. - 마더 테레사
				</div>
			</StyledContainer>
		</>
	);
}
