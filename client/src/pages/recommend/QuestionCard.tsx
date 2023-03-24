import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import QuestionCard2 from "./QuestionCard2";

const Container = styled.div`
	margin-top: 50px;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	padding: 20px 40px;
	width: 100%;
	height: 50vh;
	margin-bottom: 30px;
	justify-content: center;

	h1 {
		text-align: center;
		font-size: 1.9rem;
		color: #383838;
		margin-bottom: 200px;
	}
`;

const ButtonDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
`;

export default function QuestionCard() {
	const [point, setPoint] = useState({ human: 0, other: 0 }); // human: 0, other: 0 기본 셋
	const [questionNumber, setQuestionNumber] = useState(1); // 현재 질문 번호를 나타냄.
	const [nextClick, setNextClick] = useState(false); // 세번째 질문을 클릭하면 true가 됨.

	const handleAnswer = (answer: string) => {
		if (questionNumber === 1) {
			if (answer === "네") {
				setPoint((prev) => ({ ...prev, human: prev.human + 1 }));
			} else {
				setPoint((prev) => ({ ...prev, other: prev.other + 1 }));
			}
			setQuestionNumber(2);
		} else if (questionNumber === 2) {
			if (answer === "아니요") {
				setPoint((prev) => ({ ...prev, human: prev.human + 1 }));
			} else {
				setPoint((prev) => ({ ...prev, other: prev.other + 1 }));
			}
			setQuestionNumber(3);
		} else if (questionNumber === 3) {
			if (answer === "네") {
				setPoint((prev) => ({ ...prev, human: prev.human + 1 }));
				setNextClick(true);
			} else {
				setPoint((prev) => ({ ...prev, other: prev.other + 1 }));
				setNextClick(true);
			}
		}
	};

	return (
		<>
			{nextClick === false ? (
				<Container>
					{questionNumber === 1 && (
						<div>
							<h1>Q1. 사람과 어울리는 걸 좋아하시나요?</h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}

					{questionNumber === 2 && (
						<div>
							<h1>Q2. 자연 다큐멘터리에 관심 혹은 즐겨보신적이 있으신가요?</h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}

					{questionNumber === 3 && (
						<div>
							<h1>Q3. 내가 잘하는 것을 누군가에게 공유하시는 것을 좋아하시나요?</h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}
				</Container>
			) : (
				<QuestionCard2 data={point.human} />
			)}
		</>
	);
}
