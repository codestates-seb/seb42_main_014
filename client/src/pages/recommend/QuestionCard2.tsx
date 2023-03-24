import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "../../components/Button";

interface Iprop {
	data: number;
}

const Container = styled.div`
	margin-top: 50px;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	border-radius: 10px;

	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
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

const Btn = styled.div`
	margin: 0 auto;
	color: white;
	border-radius: 20px;
	background-color: #0c6444;
	cursor: pointer;
	width: 30%;
	text-align: center;
	padding: 20px;
	font-size: 1.8rem;

	:hover {
		color: #2f2f32;
		font-weight: bold;
	}
`;

const ButtonDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const Result = styled.div`
	h1 {
		font-size: 2rem;
		animation: ${fadeIn} 1.3s ease-in-out;
	}
`;

export default function QuestionCard(props: Iprop) {
	const [point, setPoint] = useState({ 환경: 0, 동물: 0 }); // 환경: 0, 동물: 0 기본 셋
	const [point2, setPoint2] = useState({ 장애인: 0, 어린이: 0, 노인: 0 }); // 장애인: 0, 어린이: 0 노인:0기본 셋
	const [questionNumber, setQuestionNumber] = useState(1); // 현재 질문 번호를 나타냄.

	//질문의 기준은 첫번째 값으로 함.
	const handleAnswer = (answer: string) => {
		if (questionNumber === 1) {
			if (answer === "네") {
				setPoint((prev) => ({ ...prev, 환경: prev.환경 + 1 }));
			} else {
				setPoint((prev) => ({ ...prev, 동물: prev.동물 + 1 }));
			}
			setQuestionNumber(2);
		} else if (questionNumber === 2) {
			if (answer === "아니요") {
				setPoint((prev) => ({ ...prev, 환경: prev.환경 + 1 }));
			} else {
				setPoint((prev) => ({ ...prev, 동물: prev.동물 + 1 }));
			}
			setQuestionNumber(3);
		} else if (questionNumber === 3) {
			if (answer === "네") {
				setPoint((prev) => ({ ...prev, 환경: prev.환경 + 1 }));
			} else {
				setPoint((prev) => ({ ...prev, 동물: prev.동물 + 1 }));
			}
			setQuestionNumber(4);
		} else if (questionNumber === 4) {
			if (answer === "네") {
				setPoint((prev) => ({ ...prev, 환경: prev.환경 + 1 }));
			} else {
				setPoint((prev) => ({ ...prev, 동물: prev.동물 + 1 }));
			}
			setQuestionNumber(5);
		} else if (questionNumber === 5) {
			if (answer === "네") {
				setPoint((prev) => ({ ...prev, 환경: prev.환경 + 1 }));
			} else {
				setPoint((prev) => ({ ...prev, 동물: prev.동물 + 1 }));
			}
			setQuestionNumber(6);
		} else if (questionNumber === 6) {
		}
	};
	const handleAnswer2 = (answer: string) => {
		if (questionNumber === 1) {
			if (answer === "네") {
				setPoint2((prev) => ({ ...prev, 장애인: prev.장애인 + 1 }));
				setPoint2((prev) => ({ ...prev, 어린이: prev.어린이 + 1 }));
			} else {
				setPoint2((prev) => ({ ...prev, 노인: prev.노인 + 1 }));
			}
			setQuestionNumber(2);
		} else if (questionNumber === 2) {
			if (answer === "아니요") {
				setPoint2((prev) => ({ ...prev, 어린이: prev.어린이 + 1 }));
			} else {
				setPoint2((prev) => ({ ...prev, 노인: prev.노인 + 1 }));
				setPoint2((prev) => ({ ...prev, 장애인: prev.장애인 + 1 }));
			}
			setQuestionNumber(3);
		} else if (questionNumber === 3) {
			if (answer === "네") {
				setPoint2((prev) => ({ ...prev, 노인: prev.노인 + 1 }));
			} else {
				setPoint2((prev) => ({ ...prev, 장애인: prev.장애인 + 1 }));
				setPoint2((prev) => ({ ...prev, 어린이: prev.어린이 + 1 }));
			}
			setQuestionNumber(4);
		} else if (questionNumber === 4) {
			if (answer === "네") {
				setPoint2((prev) => ({ ...prev, 어린이: prev.어린이 + 1 }));
			} else {
				setPoint2((prev) => ({ ...prev, 장애인: prev.장애인 + 1 }));
				setPoint2((prev) => ({ ...prev, 노인: prev.노인 + 1 }));
			}
			setQuestionNumber(5);
		} else if (questionNumber === 5) {
			if (answer === "네") {
				setPoint2((prev) => ({ ...prev, 어린이: prev.어린이 + 1 }));
			} else {
				setPoint2((prev) => ({ ...prev, 장애인: prev.장애인 + 1.1 }));
				setPoint2((prev) => ({ ...prev, 노인: prev.노인 + 1 }));
			}
			setQuestionNumber(6);
		} else if (questionNumber === 6) {
		}
	};

	const topPoint = Object.keys(point).reduce((maxProp, prop) => {
		if (point[prop as keyof typeof point] > point[maxProp as keyof typeof point]) {
			return prop;
		} else {
			return maxProp;
		}
	});
	const topPoint2 = Object.keys(point2).reduce((maxProp, prop) => {
		if (point2[prop as keyof typeof point2] > point2[maxProp as keyof typeof point2]) {
			return prop;
		} else {
			return maxProp;
		}
	});

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/recommend", { state: topPoint });
	};
	const handleClick2 = () => {
		navigate("/recommend", { state: topPoint2 });
	};

	return (
		<>
			{props.data === 1 || props.data === 0 ? (
				<Container>
					{questionNumber === 1 && (
						<div>
							<h1>Q1.텀블러를 평소에 자주 사용하시나요?</h1>
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
							<h1>Q2. 동물들과 잘 어울리시나요?</h1>
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
							<h1>Q3. 미니멀 라이프에 대해 관심이 있으신가요?</h1>
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
					{questionNumber === 4 && (
						<div>
							<h1>Q4. 장볼 때 장바구니를 들고 다니시나요? </h1>
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
					{questionNumber === 5 && (
						<div>
							<h1>Q5. 동물 관련된 알러지가 있으신가요? </h1>
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
					{questionNumber === 6 && (
						<Result>
							<h1>결과가 나왔습니다! 결과 확인하러 가기 버튼을 눌러주세요!</h1>
							<Btn onClick={handleClick}>결과 확인 하러 가기</Btn>
						</Result>
					)}
				</Container>
			) : (
				<Container>
					{questionNumber === 1 && (
						<div>
							<h1>Q1.신세대 용어를 잘 아시나요?</h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer2("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer2("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}

					{questionNumber === 2 && (
						<div>
							<h1>Q2. 평소에 배려석에 자리가 있더라도 비워두어야 한다고 생각하시나요?</h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer2("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer2("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}

					{questionNumber === 3 && (
						<div>
							<h1>Q3. 고령화 문제에 대해 깊게 생각해보신적이 있으신가요?</h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer2("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer2("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}
					{questionNumber === 4 && (
						<div>
							<h1>Q4.다음 세대를 위해서 투자를 해야한다고 생각하시나요? </h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer2("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer2("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}
					{questionNumber === 5 && (
						<div>
							<h1>Q5.활동적인걸 좋아하시나요? </h1>
							<ButtonDiv>
								<Button
									value="네"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#8dc59a"
									onClick={() => handleAnswer2("네")}
								/>
								<Button
									value="아니요"
									width={250}
									height={60}
									radius={20}
									textSize={22}
									bgColor="#ff9a9a"
									onClick={() => handleAnswer2("아니요")}
								/>
							</ButtonDiv>
						</div>
					)}
					{questionNumber === 6 && (
						<Result>
							<h1>결과가 나왔습니다! 결과 확인하러 가기 버튼을 눌러주세요!</h1>
							<Btn onClick={handleClick2}>결과 확인 하러 가기</Btn>
						</Result>
					)}
				</Container>
			)}
		</>
	);
}
