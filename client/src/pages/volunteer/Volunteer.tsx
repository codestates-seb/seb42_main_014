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
	const optionArr = ["찜 많은순", "봉사시간순", "모집인원순"];
	console.log(volunData);
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
									volunteerImage,
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
