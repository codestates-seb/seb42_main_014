import Carousel from "../../components/Carousel";
import Card from "../../components/volunteer/Card";
import ReplayIcon from "@mui/icons-material/Replay";
import Category from "../../components/volunteer/Category";
import SearchBar from "../../components/volunteer/SearchBar";
import styled from "styled-components";
import DropdownMenu from "../../components/volunteer/Dropdown";
import { SetStateAction, useEffect, useState } from "react";
import { volunteerDataGet } from "../../api/volunteer/volunteerData";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ForestIcon from "@mui/icons-material/Forest";
import PetsIcon from "@mui/icons-material/Pets";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AccessibleIcon from "@mui/icons-material/Accessible";
import SvgIcon from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom";
import Address from "../../components/Address";
import Button from "../../components/Button";
import Paginations from "../../components/VolPagination ";

const StyledAreaContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledContainerDiv = styled.div`
	margin-bottom: 100px;
`;

const StyledCardContainerDiv = styled.div`
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

const H1 = styled.h1`
	display: block;
	text-align: center;
	margin: 20%;
`;
const SearchContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`;

const FilterContainerDiv = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 3px solid black;
	align-items: center;
	select {
		border: 1px solid gray;
		border-radius: 5px;
		height: 45px;
		width: 200px;
		text-align: center;
		padding: 10px;
	}
`;

const ResetButton = styled.button`
	width: 54px;
	height: 45px;
	border-radius: 10px;
	margin-left: 10px;
	cursor: pointer;
	background-color: #000000;
	color: white;
	border: none;
	:hover {
		color: black;
		background-color: white;
		transition: all 0.3s;
		border: 1px solid gray;
	}
`;

const optionArr = [
	"기본순",
	"찜 많은순",
	"봉사시간 짧은 순",
	"봉사시간 긴 순",
	"모집인원 적은 순",
	"모집인원 많은 순",
];

export default function Volunteer() {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedArea, setSelectedArea] = useState("");
	const [selectedSubArea, setSelectedSubArea] = useState("");
	const [volunData, setVolunData] = useState([]);
	const [selectedOption, setSelectedOption] = useState("기본순");
	const [searchValue, setSearchValue] = useState(null);
	const [searchCategory, setSearchCategory] = useState("volunteer");
	const [hover, setHover] = useState(false);
	const navigate = useNavigate();

	const handleClick = (id: number) => {
		navigate(`/volunteer/${id}`);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const handleOptionChange = async (selectedOption: SetStateAction<string | any>) => {
		setSelectedOption(selectedOption);
	};
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};
	const handleResetButton = () => {
		setSearchValue("");
		setSelectedArea("");
		setSelectedSubArea("");
		volunteerDataGet("volunteers").then((res) => setVolunData(res.data));
	};

	useEffect(() => {
		let URL = `volunteers?volunteerName&organizationName&tagName&orderBy=volunteerId&sort=DESC&pageNum=1`;
		switch (selectedOption) {
			case "기본순":
				URL = `volunteers?volunteerName&organizationName&tagName=${selectedCategory}&province=${selectedArea}&city=${selectedSubArea}&orderBy=volunteerId&sort=DESC&pageNum=${currentPage}`;
				break;
			case "찜 많은순":
				URL = `volunteers?volunteerName&organizationName&tagName=${selectedCategory}&province=${selectedArea}&city=${selectedSubArea}&orderBy=likeCount&sort=DESC&pageNum=${currentPage}`;
				break;
			case "봉사시간 짧은 순":
				URL = `volunteers?volunteerName&organizationName&tagName=${selectedCategory}&province=${selectedArea}&city=${selectedSubArea}&orderBy=volunteerTime&sort=ASC&pageNum=${currentPage}`;
				break;
			case "봉사시간 긴 순":
				URL = `volunteers?volunteerName&organizationName&tagName=${selectedCategory}&province=${selectedArea}&city=${selectedSubArea}&orderBy=volunteerTime&sort=DESC&pageNum=${currentPage}`;
				break;
			case "모집인원 적은 순":
				URL = `volunteers?volunteerName&organizationName&tagName=${selectedCategory}&province=${selectedArea}&city=${selectedSubArea}&orderBy=applyLimit&sort=ASC&pageNum=${currentPage}`;
				break;
			case "모집인원 많은 순":
				URL = `volunteers?volunteerName&organizationName&tagName=${selectedCategory}&province=${selectedArea}&city=${selectedSubArea}&orderBy=applyLimit&sort=DESC&pageNum=${currentPage}`;
				break;
			default:
				break;
		}

		const getVolunteerData = async () => {
			const result = await volunteerDataGet(URL);
			setTotalPages(result.totalPages);
			setVolunData(result.data);
		};

		getVolunteerData();
	}, [selectedOption, selectedArea, selectedSubArea, currentPage, selectedCategory]);

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
		setCurrentPage(1);
	};

	const handleChangeSearchValue = () => {
		let requestUrl;
		if (searchCategory === "org") {
			requestUrl = `volunteers?volunteerName&organizationName=${searchValue}&tagName&province&city&orderBy=volunteerId&sort=DESC&pageNum=${currentPage}`;
			volunteerDataGet(requestUrl).then((res) => setVolunData(res.data));
		} else {
			requestUrl = `volunteers?volunteerName=${searchValue}&organizationName&tagName&province&city&orderBy=volunteerId&sort=DESC&pageNum=${currentPage}`;
			volunteerDataGet(requestUrl).then((res) => setVolunData(res.data));
		}
	};

	return (
		<>
			<StyledContainerDiv>
				<Carousel />
				<Category onCategoryClick={handleCategoryClick} />
				<div style={{ margin: "50px" }}>
					<StyledAreaContainer>
						<SearchContainerDiv>
							<div>
								<input
									type={"radio"}
									id="volunteer"
									value="봉사명"
									checked={searchCategory === "volunteer"}
									onClick={() => setSearchCategory("volunteer")}
								/>
								<label style={{ marginRight: "10px" }} htmlFor="volunteer">
									봉사명
								</label>
								<input
									type={"radio"}
									id="org"
									value="봉사명"
									checked={searchCategory === "org"}
									onClick={() => setSearchCategory("org")}
								/>
								<label htmlFor="org">기관명</label>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginTop: "10px",
								}}
							>
								<SearchBar
									placeholder={
										searchCategory === "volunteer"
											? "봉사명을 입력해 주세요."
											: "기관명을 입력해주세요"
									}
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
									style={{ marginRight: "10px" }}
								/>
								<Button
									width={80}
									height={45}
									value={"검색"}
									radius={10}
									onClick={handleChangeSearchValue}
								/>
								<ResetButton
									onMouseEnter={() => setHover(true)}
									onMouseLeave={() => setHover(false)}
									onClick={handleResetButton}
								>
									{hover ? <ReplayIcon /> : "초기화"}
								</ResetButton>
							</div>
						</SearchContainerDiv>
						<FilterContainerDiv>
							<Address
								selectedArea={selectedArea}
								setSelectedArea={setSelectedArea}
								selectedSubArea={selectedSubArea}
								setSelectedSubArea={setSelectedSubArea}
							/>
							<DropdownMenu
								onChange={handleOptionChange}
								setSelectedOption={setSelectedOption}
								selectedOption={selectedOption}
								placeholder="필터 조건 선택"
								option={optionArr}
								radius={10}
								height={50}
								boxWidth={200}
								max_min_width={200}
							/>
						</FilterContainerDiv>
					</StyledAreaContainer>
					<div />
					{volunData.length ? (
						<StyledCardContainerDiv>
							{volunData.map((el) => {
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
						<H1>해당 게시글이 존재하지 않습니다.</H1>
					)}

					{volunData.length ? (
						<Paginations
							totalItemsCount={totalPages === 1 ? totalPages : totalPages * 12}
							activePage={currentPage}
							onPageChange={handlePageChange}
							itemsCountPerPage={12}
						/>
					) : null}
				</div>
			</StyledContainerDiv>
		</>
	);
}
