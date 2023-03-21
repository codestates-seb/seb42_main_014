import Carousel from "../../components/Carousel";
import Card from "../../components/volunteer/Card";
import Category from "../../components/volunteer/Category";
import SearchBar from "../../components/volunteer/SearchBar";
import styled from "styled-components";
import DropdownMenu from "../../components/volunteer/Dropdown";
import { SetStateAction, useEffect, useState } from "react";
import { volunteerDataGet } from "../../api/volunteer/volunteerData";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BusinessIcon from "@mui/icons-material/Business";
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
	justify-content: flex-start;
	border-bottom: 2px solid gray;
	margin-bottom: 20px;
	padding-bottom: 20px;
	align-items: center;
`;
const Sbar = styled.div`
	display: flex;
	height: 100%;
	justify-content: flex-start;
	width: auto;

	margin-bottom: 20px;
	padding-bottom: 20px;
	align-items: center;
	select {
		border: 2px solid gray;
		padding: 5px;
		font-weight: bold;
		font-size: 1rem;
	}
	span {
		white-space: nowrap;
		padding: 5px;
		font-weight: bold;
		font-size: 1.2rem;
		margin-right: 10px;
	}
`;

const StyledContainerDiv = styled.div`
	margin-bottom: 100px;
`;

const StyledCardContainerDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 30px;
	place-items: center;
`;

const optionArr = [
	"찜 많은순",
	"봉사시간 짧",
	"봉사시간 긴",
	"모집인원 적은 순",
	"모집인원 많은 순",
];

export default function Volunteer() {
	const [selectedArea, setSelectedArea] = useState("");
	const [selectedSubArea, setSelectedSubArea] = useState("");
	const [volunData, setVolunData] = useState([]);
	const [selectedOption, setSelectedOption] = useState("");
	const navigate = useNavigate();
	const URL = `volunteers?volunteerName&organizationName&tagName&province&city &orderBy=volunteerId&sort=DESC&pageNum=1`;
	useEffect(() => {
		const getVolunteerData = async () => {
			const result = await volunteerDataGet(URL);
			setVolunData(result);
		};
		getVolunteerData();
	}, [URL]);

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
		const getVolunteerData = async () => {
			let result;

			switch (selectedOption) {
				case "찜 많은순":
					result = await volunteerDataGet(
						"volunteers?volunteerName&organizationName&tagName&province&city &orderBy=likeCount&sort=DESC&pageNum=1",
					);
					break;
				case "봉사시간 짧":
					result = await volunteerDataGet(
						"volunteers?volunteerName&organizationName&tagName&province&city &orderBy=volunteerTime&sort=ASC&pageNum=1",
					);
					break;
				case "봉사시간 긴":
					result = await volunteerDataGet(
						"volunteers?volunteerName&organizationName&tagName&province&city &orderBy=volunteerTime&sort=DESC&pageNum=1",
					);
					break;
				case "모집인원 적은 순":
					result = await volunteerDataGet(
						"volunteers?volunteerName&organizationName&tagName&province&city &orderBy=applyLimit&sort=ASC&pageNum=1",
					);
					break;
				case "모집인원 많은 순":
					result = await volunteerDataGet(
						"volunteers?volunteerName&organizationName&tagName&province&city &orderBy=applyLimit&sort=DESC&pageNum=1",
					);
					break;
				default:
					result = await volunteerDataGet("volunteers");
					break;
			}
			setVolunData(result);
		};
		getVolunteerData();
	}, [URL, selectedOption]);

	return (
		<>
			<StyledContainerDiv>
				<Carousel />
				<Category />
				<div style={{ margin: "50px" }}>
					<Bar>
						<SearchBar placeholder="검색어를 입력해 주세요." width={250} height={45} radius={10} />

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
					<Sbar>
						<span>지역 구분 : </span>
						<Address />
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
								} = el;
								const categoryItems = {
									어린이: ChildCareIcon,
									장애인: AccessibleIcon,
									노인: ElderlyIcon,
									동물: PetsIcon,
									환경: ForestIcon,
									사회: BusinessIcon,
								};
								return (
									<Card
										src="/images/home/main-img-1.png"
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
														: tagName === "사회"
														? categoryItems["사회"]
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
