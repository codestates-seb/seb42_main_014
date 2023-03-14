import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import Button from "../Button";
export default function GroupComment() {
	const StyledContainerDiv = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 30%;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
		min-width: 500px;

		section {
			margin: 10px;
			width: 100%;
			height: 400px;
			min-width: 500px;
		}

		.layout {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 500px;
		}
		input {
			width: 60%;
			height: 40px;
			border: 1px solid gray;
			border-radius: 20px;
			margin: 20px;
			padding: 20px;
		}

		.answer-read-container {
			display: flex;
			align-items: center;
			border: 1px solid gray;
			width: 90%;
			border-radius: 20px;
			padding: 5px 20px 5px 20px;
			margin: 20px;
			min-width: 400px;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.11);
		}
	`;

	const StyledInputContainerDiv = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid gray;
		margin: 20px;
	`;
	return (
		<StyledContainerDiv>
			<section>
				<StyledInputContainerDiv>
					<FaUserCircle size={40} />
					<input placeholder="자유롭게 댓글을 남겨보세요!" />
					<Button value="등록" width={55} height={40} radius={10} textSize={14} bgColor="black" />
				</StyledInputContainerDiv>
				<div className="answer-read-container">
					<FaUserCircle size={40} />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginLeft: "20px",
							width: "100%",
						}}
					>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								<span style={{ marginRight: "10px" }}>장지우</span>
								<span style={{ color: "gray" }}>2023.03.14</span>
							</div>
							<div>
								<span>수정 |</span>
								<span> 삭제</span>
							</div>
						</div>
						<span>봉사 너무 재밌어요</span>
					</div>
				</div>
			</section>
		</StyledContainerDiv>
	);
}
