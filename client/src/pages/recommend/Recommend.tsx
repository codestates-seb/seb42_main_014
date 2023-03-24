import styled from "styled-components";
import Card from "../../components/volunteer/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { volunteerDataGet } from "../../api/volunteer/volunteerData";
import { useEffect, useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ForestIcon from "@mui/icons-material/Forest";
import PetsIcon from "@mui/icons-material/Pets";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AccessibleIcon from "@mui/icons-material/Accessible";

const StyledContainerDiv = styled.div`
	margin-bottom: 100px;
`;

const StyledAreaContainer = styled.div`
	display: flex;
	width: 90%;
	margin: 0 auto;
	flex-direction: column;
`;

const TitleDiv = styled.div`
	background-color: #ffa9a9;
	display: flex;
	border-radius: 10px;
	padding: 20px 40px;
	margin: 2rem auto 1rem auto;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	color: #ffffff;
	width: 100%;
	max-width: 1233px;
	justify-content: center;
	font-weight: bold;
	font-size: 1.3rem;
`;

const ContentDiv = styled.div`
	background-color: #ffa9a9;
	display: flex;
	border-radius: 10px;
	padding: 20px 40px;
	margin: 0 auto;
	margin-bottom: 10px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	color: #ffffff;
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
	/* width: 1036px; */
	height: 560px;
	font-size: 2rem;
	padding: 20px;
	line-height: 200%;
	text-align: left;
`;

const StyledCardContainerDiv = styled.div`
	margin-top: 2rem;
	padding-top: 2rem;
	border-top: 3px solid #383838;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(4, 400px);
	row-gap: 30px;
	justify-content: center;
	@media (max-width: 1550px) {
		grid-template-columns: repeat(3, 400px);
	}
	@media (max-width: 1150px) {
		grid-template-columns: repeat(2, 400px);
	}
	@media (max-width: 700px) {
		grid-template-columns: repeat(1, 400px);
	}
`;

export default function Recommend() {
	const [title, setTitle] = useState("");
	const [volunData, setVolunData] = useState([]);
	const [tag, setTag] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (id: number) => {
		navigate(`/volunteer/${id}`);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		setTag(location.state);
		let URL = `volunteers?volunteerName&organizationName&tagName=${tag}&orderBy=volunteerId&sort=DESC&pageNum=1`;
		const getVolunteerData = async () => {
			const result = await volunteerDataGet(URL);
			setVolunData(result.data);
		};

		if (tag === "동물") {
			setTitle("동물수호가");
		} else if (tag === "환경") {
			setTitle("지구지킴이");
		} else if (tag === "어르신") {
			setTitle("오늘부터 손주");
		} else if (tag === "장애인") {
			setTitle("함께하는 친구");
		} else if (tag === "어린이") {
			setTitle("키다리 아저씨");
		}

		getVolunteerData();
	}, [location.state, tag]);

	return (
		<>
			<StyledContainerDiv>
				<StyledAreaContainer>
					<TitleDiv>
						{/* 제목 */}
						<h1>{`당신의 봉사 유형은 "${title}" 입니다.`}</h1>
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
				</StyledAreaContainer>
				<StyledCardContainerDiv>
					{/* 추천 봉사 리스트 */}
					{volunData &&
						volunData.slice(0, 8).map((el) => {
							const {
								applyCount,
								applyLimit,
								place,
								volunteerId,
								volunteerDate,
								tagName,
								title,
								volunteerImage,
								organizationName,
								likeCount,
							} = el;
							const categoryItems = {
								어린이: ChildCareIcon,
								장애인: AccessibleIcon,
								어르신: ElderlyIcon,
								동물: PetsIcon,
								환경: ForestIcon,
							};
							return (
								<Card
									src={
										volunteerImage ||
										"https://main014-bucket.s3.ap-northeast-2.amazonaws.com/profile/011e2a77-4a54-4377-8679-6c49c4b86e7f%ED%95%9C%EA%B8%80%EC%9D%B4%EB%A6%84%EC%9D%BC%EB%95%90.png"
									}
									title={title}
									organizationName={organizationName}
									date={volunteerDate}
									place={place}
									person={`${applyCount} / ${applyLimit}`}
									category={
										<SvgIcon
											component={
												tagName === "어린이"
													? categoryItems["어린이"]
													: tagName === "장애인"
													? categoryItems["장애인"]
													: tagName === "어르신"
													? categoryItems["어르신"]
													: tagName === "동물"
													? categoryItems["동물"]
													: tagName === "환경"
													? categoryItems["환경"]
													: null
											}
											inheritViewBox
										/>
									}
									onClick={() => handleClick(volunteerId)}
									like={likeCount}
								/>
							);
						})}
				</StyledCardContainerDiv>
			</StyledContainerDiv>
		</>
	);
}
