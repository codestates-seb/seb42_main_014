import styled from "styled-components";
import QuestionCard from "../../components/recommend/QuestionCard";

const Body = styled.div`
	width: 100%;
	height: 100vh;
	margin-top: -80px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70%;
	margin-top: 150px;
	& > h1 {
		font-size: 2.5rem;
	}
`;

const QuestionList = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function Test() {
	return (
		<Body>
			<Container>
				<h1>봉사 성향 테스트</h1>
				<QuestionList>
					<QuestionCard />
				</QuestionList>
			</Container>
		</Body>
	);
}
