import styled from "styled-components";
import Category from "../../components/volunteer/Category";
import CommunityCard from "../../components/community/CommunityCard";
import Button from "../../components/Button";
import SvgIcon from "@mui/material/SvgIcon";
import PetsIcon from "@mui/icons-material/Pets";
import { useEffect, useState } from "react";
import { myPageGet } from "../../api/mypage/MypageGet";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ForestIcon from "@mui/icons-material/Forest";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { useNavigate } from "react-router-dom";
import Paginations from "../../components/community/CommunityPagination ";

const Container = styled.div`
	height: 100%;
	min-height: 1300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	& > div {
		width: 80%;
		display: flex;
	}
	button {
		font-weight: bold;
	}
`;

const ExplainDiv = styled.div`
	font-size: 1.3rem;
	display: flex;
	justify-content: space-between;
	border-top: 1px solid #383838;
	padding: 2rem 0;
	& > div:first-child {
		width: 100%;
		border-left: 10px solid #383838;
		padding-left: 10px;
		font-weight: bold;
	}
`;
const H1 = styled.h1`
	display: block;
	text-align: center;
	margin: 20%;
`;

const ButtonDiv = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	:hover {
		transition: all 0.2s linear;
		transform: scale(1.1);
	}
`;
const PAGE_RANGE_DISPLAYED = 5;
const ITEMS_COUNT_PER_PAGE = 5;
export default function Community() {
	const [activePage, setActivePage] = useState(1);
	const [items, setItems] = useState([]);
	const [totalItemsCount, setTotalItemsCount] = useState(0);
	const [AllCount, setAllCount] = useState(0);
	const [getCommunityData, setGetCommunityData] = useState([]);
	const [getMyScore, setGetMyScore] = useState<any>(0);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [member, setIsMember] = useState<boolean | null>(null);

	const navigate = useNavigate();
	const handlePageChange = (pageNumber: number) => {
		setActivePage(pageNumber);
	};

	useEffect(() => {
		const fetchData = async () => {
			myPageGet("members/me").then((res) => setGetMyScore(res.data));

			const result = await myPageGet(`groups?`);
			setGetCommunityData(result.data);
			setItems(result.data);
			setTotalItemsCount(result.data.length);
			setAllCount(result.data.length);
		};
		fetchData();
	}, []);
	const startIndex = (activePage - 1) * ITEMS_COUNT_PER_PAGE;
	const endIndex = startIndex + ITEMS_COUNT_PER_PAGE;
	const displayedItems = items.slice(startIndex, endIndex);
	console.log(items);

	const { point } = getMyScore;

	const handleGroupClick = async (id: number) => {
		const response = await myPageGet(`groups/${id}`);
		const { groupMember } = response.data;

		if (groupMember === true) {
			setIsMember(true);
			navigate(`/community/${id}`, {
				state: id,
			});
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		} else if (groupMember === false) {
			setIsMember(false);
			alert("멤버만 입장 가능 합니다!");
		}
	};

	const handleGroupAddClick = () => {
		if (point >= 15) {
			navigate("/grouppost");
		} else {
			alert(`봉사점수 15점부터 신청 가능합니다!`);
		}
	};
	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
		const filteredData = getCommunityData.filter((el) => el.tagName === category);
		setItems(filteredData);
		setActivePage(1);
		if (category === "") {
			setTotalItemsCount(AllCount);
			setItems(getCommunityData);
		} else {
			setTotalItemsCount(filteredData.length);
		}
	};

	return (
		<>
			<Category onCategoryClick={handleCategoryClick} />

			<div style={{ marginBottom: "100px" }}>
				<Container>
					<ExplainDiv>
						<div>
							봉사점수 15점 이상부터 그룹장이 될 수 있어요.
							<br />
							현재 내 봉사점수는 <span style={{ color: "red" }}>{point}</span> 점이예요.
						</div>
						<ButtonDiv onClick={handleGroupAddClick}>
							<Button
								value="+ 그룹 등록"
								width={150}
								height={40}
								radius={20}
								textSize={17}
								bgColor="black"
								style={{ whiteSpace: "nowrap" }}
							/>
						</ButtonDiv>
					</ExplainDiv>
					{displayedItems.length ? (
						displayedItems.map((el) => {
							const { groupImage, groupName, place, content, tagName, groupId } = el;

							const categoryItems = {
								어린이: ChildCareIcon,
								장애인: AccessibleIcon,
								노인: ElderlyIcon,
								동물: PetsIcon,
								환경: ForestIcon,
							};

							if (tagName === selectedCategory) {
								return (
									<>
										<CommunityCard
											member={member}
											id={groupId}
											key={groupId}
											src={groupImage}
											name={groupName}
											place={place}
											intro={content}
											hashtag={`#${tagName}`}
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
											onClick={() => handleGroupClick(groupId)}
										/>
									</>
								);
							} else if (selectedCategory === "") {
								return (
									<CommunityCard
										member={member}
										key={groupId}
										id={groupId}
										src={groupImage}
										name={groupName}
										place={place}
										intro={content}
										hashtag={`#${tagName}`}
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
										onClick={() => handleGroupClick(groupId)}
									/>
								);
							}
						})
					) : (
						<H1>해당 게시글이 존재하지 않습니다.</H1>
					)}
					{totalItemsCount >= 4 ? (
						<Paginations
							activePage={activePage}
							itemsCountPerPage={ITEMS_COUNT_PER_PAGE}
							totalItemsCount={totalItemsCount}
							pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
							onChange={handlePageChange}
						/>
					) : null}
				</Container>
			</div>
		</>
	);
}
