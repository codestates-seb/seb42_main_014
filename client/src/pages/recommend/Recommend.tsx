import styled from "styled-components";
import Card from "../../components/volunteer/Card";
import { FaEnvira } from "react-icons/fa";

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
	width: 70%;
	margin-top: 50px;
	& > div {
		background-color: #ffa9a9;
		display: flex;
		border-radius: 10px;
		padding: 20px 40px;
		margin: 0 auto;
		margin-bottom: 10px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
		color: #ffffff;
		width: 1116px;

		:last-child {
			background-color: transparent;
			border-radius: 0;
			box-shadow: none;
			border-top: 3px solid #383838;
			margin-top: 2rem;
			padding: 2rem 0 0 0;
			color: #000000;
			justify-content: left;
		}
	}
`;

const TitleDiv = styled.div`
	justify-content: center;
	font-weight: bold;
	font-size: 1.3rem;
`;

const ContentDiv = styled.div`
	height: 600px;
`;

const ImgDiv = styled.div`
	display: flex;
	width: 100%;
	img {
		width: 100%;
		border-radius: 10px;
		filter: brightness(50%);
	}
`;

const WordDiv = styled.div`
	position: absolute;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 1036px;
	height: 560px;
	font-size: 2rem;
	padding: 20px;
	line-height: 200%;
	text-align: right;
`;

export default function Recommend() {
	return (
		<>
			<Body>
				<Container>
					<TitleDiv>
						{/* 제목 */}
						<h1>당신의 봉사 유형은 "동물수호가" 입니다.</h1>
					</TitleDiv>
					<ContentDiv>
						{/* 사진과 명언 */}
						<ImgDiv>
							{/* 멍멍이 이미지 */}
							<img
								src="https://post-phinf.pstatic.net/MjAxNzA2MjlfMjk4/MDAxNDk4Njk4OTYzMTIz.RC7_Z7bSDD0noFihxaBGb5axQwFltnhYJnfXhCOlDu4g.ksRlpD9YhJQAwRFH0iw5qQvuZYkuAFDO5uoDZrHsfhcg.PNG/20170517_130400.png?type=w1200"
								alt="강아지"
							/>
						</ImgDiv>
						<WordDiv>
							<span>
								모든 사람이 강아지만큼 <br />
								무조건 사랑하는 능력이 있다면 <br />
								이 세상은 더 좋은 곳이 <br />
								될 것입니다. <br /> - M. K. Clinton
							</span>
						</WordDiv>
					</ContentDiv>
					<div>
						{/* 추천 봉사 리스트 */}
						<Card
							width={380}
							height={350}
							src="/images/home/main-img-1.png"
							title="폐가구를 정리해요"
							date="일시 : 2023년 3월 10일 14~16시(2h)"
							place="장소 : 서울시 광진구"
							person="5 / 8"
							category={<FaEnvira size={24} />}
						/>
					</div>
				</Container>
			</Body>
		</>
	);
}
