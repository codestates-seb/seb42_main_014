import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../Button";

export default function VolunteerComment() {
	const StyledContainerDiv = styled.div`
		width: 100%;
		height: 200px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		min-width: 1035px;
		margin-top: 30px;

		.answer-input-container {
			display: flex;
			align-items: center;
			width: 100%;
			height: 60px;
			border-radius: 20px;
			justify-content: center;
			min-width: 900px;
		}
		input {
			width: 100%;
			height: 40px;
			border: 2px solid gray;
			border-radius: 20px;
			margin: 20px;
			padding: 20px;
			min-width: 500px;
		}

		.answer-read-container {
			display: flex;
			align-items: center;
			border: 1px solid gray;
			width: 90%;
			border-radius: 20px;
			padding: 20px;
			margin: 20px;
			min-width: 1000px;
		}
	`;
	const Comment = styled.div`
		width: 90%;
		margin-top: 15px;
	`;
	return (
		<StyledContainerDiv>
			<Comment>
				<div className="answer-input-container">
					<FaUserCircle size={40} />
					<input placeholder="봉사 후기를 남겨주세요." />
					<Button
						value="등록하기"
						width={90}
						height={40}
						radius={10}
						textSize={14}
						bgColor="black"
						iconName={<AiOutlinePlus style={{ marginLeft: "10px" }} />}
					/>
				</div>
			</Comment>
			<div className="answer-read-container">
				<FaUserCircle size={40} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginLeft: "20px",
						width: "90%",
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
					<span>답글 내용입니다.</span>
				</div>
			</div>
		</StyledContainerDiv>
	);
}
