import styled from "styled-components";
import QuestionCard from "../../components/recommend/QuestionCard";

const Body = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 100px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70%;
	margin-top: 50px;
	& > h1 {
		font-size: 2.5rem;
	}
`;

const QuestionList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
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
