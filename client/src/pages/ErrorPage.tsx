import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import styled from "styled-components";
import Button from "../components/Button";
const StyledErrorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	flex-direction: column;
	div {
		margin: 20px;
		text-align: center;
	}
	span {
		font-size: 30px;
		color: #74ae6b;
		font-weight: 900;
	}

	.button-container {
		display: flex;
	}
`;

export default function ErrorPage() {
	const navigate = useNavigate();

	return (
		<StyledErrorContainer>
			<PacmanLoader color="#36d7b7" />
			<div>
				존재하지 않는 주소를 입력하셨거나, <br />
				요청하신 페이지의 주소가 변경 혹은 삭제되어 찾을 수 없습니다 {":("} <br />
				<div className="button-container">
					<Button
						onClick={() => navigate(-1)}
						value="이전으로"
						width={200}
						height={50}
						radius={10}
						bgColor={"#de86b4"}
					/>
					<Button
						onClick={() => navigate("/")}
						value="메인으로"
						width={200}
						height={50}
						radius={10}
						bgColor={"#74ae6b"}
					/>
				</div>
			</div>
		</StyledErrorContainer>
	);
}
