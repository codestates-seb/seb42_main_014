import styled from "styled-components";
import Button from "../../components/Button";

const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	padding: 20px 40px;
	width: 100%;
	margin-bottom: 30px;

	h1 {
		font-size: 1.5rem;
		color: #383838;
	}
`;

const ButtonDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
`;

export default function QuestionCard() {
	return (
		<>
			<Container>
				<h1>Q1. 휴먼, 당신은 동물을 좋아합니까?</h1>
				<ButtonDiv>
					<Button value="네" width={250} height={60} radius={20} textSize={22} bgColor="#8dc59a" />
					<Button
						value="아니요"
						width={250}
						height={60}
						radius={20}
						textSize={22}
						bgColor="#ff9a9a"
					/>
				</ButtonDiv>
			</Container>
		</>
	);
}
