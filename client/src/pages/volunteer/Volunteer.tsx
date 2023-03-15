import { FaEnvira } from "react-icons/fa";
import Carousel from "../../components/Carousel";
import Card from "../../components/volunteer/Card";
import Category from "../../components/volunteer/Category";
import SearchBar from "../../components/volunteer/SearchBar";
import styled from "styled-components";
import DropdownMenu from "../../components/volunteer/Dropdown";

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

const optionArr = ["찜 많은순", "봉사시간순", "모집인원순"];

export default function Volunteer() {
	return (
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
		</StyledContainerDiv>
	);
}
