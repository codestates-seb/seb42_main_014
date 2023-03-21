import Carousel from "../../components/Carousel";
import Card from "../../components/volunteer/Card";
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

const Bar = styled.div`
	display: flex;

	height: 100%;
	margin-bottom: 20px;
	padding-bottom: 5px;
	align-items: center;
`;
const Sbar = styled.div`
	display: flex;
	height: 100%;
	flex-direction: row;
	justify-content: flex-start;
	width: auto;
	border-bottom: 2px solid gray;
	margin-bottom: 20px;
	padding-bottom: 5px;

	select {
		cursor: pointer;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 3px, rgba(0, 0, 0, 0.21) 0px 1px 2px;
		border: 2px solid whitesmoke;
		padding: 5px;
		font-weight: bold;
		border-radius: 10px;
		font-size: 1rem;
		margin-top: 5px;
	}
	span {
		margin-top: 5px;
		text-align: left;
		white-space: nowrap;
		padding: 5px;
		font-weight: bold;
		font-size: 1.2rem;
		margin-right: 10px;
		margin-left: 10px;
	}
`;

const StyledContainerDiv = styled.div`
	margin-bottom: 100px;
`;

const StyledCardContainerDiv = styled.div`
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

const optionArr = [
	"기본순",
	"찜 많은순",
	"봉사시간 짧은 순",
	"봉사시간 긴 순",
	"모집인원 적은 순",
	"모집인원 많은 순",
];

export default function Volunteer() {
	const [selectedArea, setSelectedArea] = useState("");
	const [selectedSubArea, setSelectedSubArea] = useState("");
	const [volunData, setVolunData] = useState([]);
	const [selectedOption, setSelectedOption] = useState("");
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

	useEffect(() => {
		let URL =
			"volunteers?volunteerName&organizationName&tagName&orderBy=volunteerId&sort=DESC&pageNum=1";
		switch (selectedOption) {
			case "기본순":
				URL = `volunteers?volunteerName&organizationName&tagName&province=${selectedArea}&city=${selectedSubArea}&orderBy=volunteerId&sort=DESC&pageNum=1`;
				break;
			case "찜 많은순":
				URL = `volunteers?volunteerName&organizationName&tagName&province=${selectedArea}&city=${selectedSubArea}&orderBy=likeCount&sort=DESC&pageNum=1`;
				break;
			case "봉사시간 짧은 순":
				URL = `volunteers?volunteerName&organizationName&tagName&province=${selectedArea}&city=${selectedSubArea}&orderBy=volunteerTime&sort=ASC&pageNum=1`;
				break;
			case "봉사시간 긴 순":
				URL = `volunteers?volunteerName&organizationName&tagName&province=${selectedArea}&city=${selectedSubArea}&orderBy=volunteerTime&sort=DESC&pageNum=1`;
				break;
			case "모집인원 적은 순":
				URL = `volunteers?volunteerName&organizationName&tagName&province=${selectedArea}&city=${selectedSubArea}&orderBy=applyLimit&sort=ASC&pageNum=1`;
				break;
			case "모집인원 많은 순":
				URL = `volunteers?volunteerName&organizationName&tagName&province=${selectedArea}&city=${selectedSubArea}&orderBy=applyLimit&sort=DESC&pageNum=1`;
				break;
			default:
				break;
		}

		const getVolunteerData = async () => {
			const result = await volunteerDataGet(URL);
			setVolunData(result);
		};

		getVolunteerData();
	}, [selectedOption, selectedArea, selectedSubArea]);

	return (
		<>
			<StyledContainerDiv>
				<Carousel />
				<Category />
				<div style={{ margin: "50px" }}>
					<Sbar>
						<Bar>
							<SearchBar
								placeholder="검색어를 입력해 주세요."
								width={250}
								height={45}
								radius={10}
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
						</Bar>

						<span>지역 구분 : </span>
						<Address
							selectedArea={selectedArea}
							setSelectedArea={setSelectedArea}
							selectedSubArea={selectedSubArea}
							setSelectedSubArea={setSelectedSubArea}
						/>
					</Sbar>
					<StyledCardContainerDiv>
						{volunData &&
							volunData.map((el) => {
								const {
									applyCount,
									applyLimit,
									place,
									volunteerId,
									volunteerDate,
									tagName,
									title,
									volunteerImage,
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
									/>
								);
							})}
					</StyledCardContainerDiv>
				</div>
			</StyledContainerDiv>
		</>
	);
}
