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
import Paginations from "../../components/VolPagination ";
import { EmptyContent } from "../../EmptyContent";

const StyledContainerDiv = styled.div`
	height: 100%;
	margin-bottom: 100px;
`;

const StyledAreaContainer = styled.div`
	display: flex;
	height: 100%;
	margin: 0 auto;
	flex-direction: column;
`;

const TitleDiv = styled.div`
	background-color: #ffa9a9;
	color: #ffffff;
	border-radius: 10px;
	display: flex;
	width: 100%;
	padding: 10px 20px;
	margin: 2rem auto 1rem auto;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	justify-content: center;
	font-weight: bold;
	font-size: 1.2rem;
`;

const ContentDiv = styled.div`
	background-color: #ffa9a9;
	color: #ffffff;
	display: flex;
	border-radius: 10px;
	width: 100%;
	justify-content: space-around;
	padding: 20px 20px;
	margin: 0 auto;
	margin-bottom: 1rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	height: 500px;
`;

const ImgDiv = styled.div`
	display: flex;
	width: 40%;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	border-radius: 10px;
	img {
		width: 100%;
		border-radius: inherit;
	}
`;

const WordDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 20px;
	line-height: 200%;
	text-align: center;
	font-size: 2rem;
	@media (max-width: 1550px) {
		font-size: 1.5rem;
		line-height: 200%;
	}
`;

const RecommendDiv = styled.div`
	background-color: #ffa9a9;
	color: #ffffff;
	display: flex;
	justify-content: center;
	border-radius: 10px;
	width: 100%;
	font-size: 2rem;
	padding: 10px 20px;
	@media (max-width: 1550px) {
		font-size: 1.5rem;
	}
`;

const StyledCardContainerDiv = styled.div`
	margin-top: 2rem;
	padding-top: 2rem;
	display: grid;
	place-items: center;
	grid-template-columns: repeat(4, 430px);
	row-gap: 50px;
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
	const [saying, setSaying] = useState(<span>파이팅!</span>);
	const [img, setImg] = useState("");
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [volunData, setVolunData] = useState([]);
	const [tag, setTag] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (id: number) => {
		if (localStorage.getItem("accessToken")) {
			navigate(`/volunteer/${id}`);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		} else {
			alert("로그인 후 이용해주세요");
			navigate("/login");
		}
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		setTag(location.state);
		let URL = `volunteers?volunteerName&organizationName&tagName=${location.state}&orderBy=volunteerId&sort=DESC&pageNum=${currentPage}`;
		const getVolunteerData = async () => {
			const result = await volunteerDataGet(URL);
			setTotalPages(result.totalPages);
			setVolunData(result.data);
		};

		if (tag === "동물") {
			setTitle("동물수호가");
			setImg("/images/recommend/test_animal.jpg");
			setSaying(
				<span>
					모든 사람이 강아지만큼 <br />
					무조건 사랑하는 능력이 있다면 <br />
					이 세상은 더 좋은 곳이 될 것입니다. <br /> - M. K. Clinton
				</span>,
			);
		} else if (tag === "환경") {
			setTitle("지구지킴이");
			setImg("/images/recommend/test_environment.jpg");
			setSaying(
				<span>
					자연과 가까울수록 병은 멀어지고 <br />
					자연과 멀수록 병은 가까워진다. <br /> - Johann Wolfgang von Goethe
				</span>,
			);
		} else if (tag === "노인") {
			setTitle("오늘부터 손주");
			setImg("/images/recommend/test_elderly.jpg");
			setSaying(
				<span>
					노인을 공경하지 않는 <br />
					젊은이의 노후는 <br />
					결코 행복할 수 없다. <br /> - 탈무드
				</span>,
			);
		} else if (tag === "장애인") {
			setTitle("함께하는 친구");
			setImg("/images/recommend/test_handicapped.jpg");
			setSaying(
				<span>
					행복의 한 쪽 문이 닫히면 <br />
					다른 쪽 문이 열린다. 그러나 흔히 우리는 <br />
					닫혀진 문을 오랫동안 보기 때문에 <br />
					우리를 위해 열려 있는 문을 보지 못한다. <br /> - Helen Adams Keller
				</span>,
			);
		} else if (tag === "어린이") {
			setTitle("키다리 아저씨");
			setImg("/images/recommend/test_child.jpg");
			setSaying(
				<span>
					세상에 태어난 아기는 <br />
					누구나 가치가 있다. <br /> - Charles Dickens
				</span>,
			);
		}
		getVolunteerData();
	}, [location.state, tag, currentPage]);

	return (
		<>
			<StyledContainerDiv>
				<StyledAreaContainer>
					<TitleDiv>
						<h1>{`당신의 봉사 유형은 "${title}" 입니다.`}</h1>
					</TitleDiv>
					<ContentDiv>
						<ImgDiv>
							<img src={img} alt="강아지" />
						</ImgDiv>
						<WordDiv>{saying}</WordDiv>
					</ContentDiv>
					<RecommendDiv>{`당신에게 추천하는 봉사는 '${tag} 봉사'입니다.`}</RecommendDiv>
				</StyledAreaContainer>
				{volunData.length ? (
					<StyledCardContainerDiv>
						{volunData.map((el): JSX.Element => {
							const {
								applyCount,
								applyLimit,
								place,
								volunteerId,
								volunteerDate,
								volunteerTime,
								tagName,
								title,
								volunteerImage,
								organizationName,
								likeCount,
							} = el;
							const categoryItems = {
								어린이: ChildCareIcon,
								장애인: AccessibleIcon,
								노인: ElderlyIcon,
								동물: PetsIcon,
								환경: ForestIcon,
							};
							return (
								<Card
									key={volunteerId}
									src={
										volunteerImage ||
										"https://main014-bucket.s3.ap-northeast-2.amazonaws.com/profile/011e2a77-4a54-4377-8679-6c49c4b86e7f%ED%95%9C%EA%B8%80%EC%9D%B4%EB%A6%84%EC%9D%BC%EB%95%90.png"
									}
									title={title}
									organizationName={organizationName}
									date={volunteerDate}
									time={volunteerTime}
									place={place}
									person={`${applyCount}명 / ${applyLimit}명`}
									category={
										<SvgIcon
											component={
												tagName === "어린이"
													? categoryItems["어린이"]
													: tagName === "장애인"
													? categoryItems["장애인"]
													: tagName === "노인"
													? categoryItems["노인"]
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
				) : (
					<EmptyContent content="아직 해당하는 봉사가 없어요." />
				)}

				{volunData.length ? (
					<Paginations
						totalItemsCount={totalPages === 1 ? totalPages : totalPages * 12}
						activePage={currentPage}
						onPageChange={handlePageChange}
						itemsCountPerPage={12}
					/>
				) : null}
			</StyledContainerDiv>
		</>
	);
}
