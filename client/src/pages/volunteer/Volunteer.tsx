import Carousel from "../../components/Carousel";
import Card from "../../components/volunteer/Card";
import Category from "../../components/volunteer/Category";
import SearchBar from "../../components/volunteer/SearchBar";
import styled from "styled-components";
import DropdownMenu from "../../components/volunteer/Dropdown";
import { useEffect, useState } from "react";
import { volunteerDataGet } from "../../api/volunteer/volunteerData";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BusinessIcon from "@mui/icons-material/Business";
import ForestIcon from "@mui/icons-material/Forest";
import PetsIcon from "@mui/icons-material/Pets";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AccessibleIcon from "@mui/icons-material/Accessible";
import SvgIcon from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom";

const Bar = styled.div`
	display: flex;
	border-bottom: 2px solid gray;
	margin-bottom: 20px;
	padding-bottom: 20px;
	align-items: center;
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

const optionArr = ["찜 많은순", "봉사시간순", "모집인원순"];

export default function Volunteer() {
	const [volunData, setVolunData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getVolunteerData = async () => {
			const result = await volunteerDataGet();
			setVolunData(result);
		};
		getVolunteerData();
	}, []);

	const handleClick = (id: number) => {
		navigate(`/volunteer/${id}`);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			<StyledContainerDiv>
				<Carousel />
				<Category />
				<div style={{ margin: "50px" }}>
					<Bar>
						<SearchBar placeholder="검색어를 입력해 주세요." width={250} height={45} radius={10} />

						<DropdownMenu
							placeholder="필터 조건 선택"
							option={optionArr}
							width={30}
							radius={10}
							height={50}
							boxWidth={200}
							max_min_width={200}
						/>
					</Bar>
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
