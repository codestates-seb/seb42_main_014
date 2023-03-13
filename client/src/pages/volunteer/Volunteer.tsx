import Card from "../../components/volunteer/Card";
import { FaEnvira } from "react-icons/fa";
import SearchBar from "../../components/volunteer/SearchBar";
import Button from "../../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

export default function Volunteer() {
	const StyledContainerDiv = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	`;
	const StyledCardContainerDiv = styled.div`
		display: grid;
		place-items: center;
		grid-template-columns: repeat(4, 1fr);
		min-width: 80vw;
		row-gap: 40px;
		column-gap: 20px;
	`;
	return (
		<StyledContainerDiv>
			<div style={{ display: "flex" }}>
				<SearchBar placeholder="검색어를 입력해 주세요." width={250} height={45} radius={10} />
				<Button
					value="등록하기"
					width={90}
					height={40}
					radius={10}
					textSize={14}
					bgColor="black"
					iconName={<AiOutlinePlus style={{ marginLeft: "5px" }} />}
				/>
			</div>
			<StyledCardContainerDiv>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
				<Card
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="2023년 3월 10일 14~16시(2h)"
					place="서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
			</StyledCardContainerDiv>
		</StyledContainerDiv>
	);
}
