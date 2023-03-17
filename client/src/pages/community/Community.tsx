import styled from "styled-components";
import Category from "../../components/volunteer/Category";
import CommunityCard from "../../components/community/CommunityCard";
import Button from "../../components/Button";
import SvgIcon from "@mui/material/SvgIcon";
import PetsIcon from "@mui/icons-material/Pets";

export default function Community() {
	const Container = styled.div`
		height: 100%;
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
			// erase before commit
			font-weight: bold;
		}
	`;

	const ButtonDiv = styled.div`
		display: flex;
		justify-content: right;
		align-items: center;
	`;

	return (
		<>
			<Category />
			<Container>
				<ExplainDiv>
					{/* 그룹 등록 관련 안내 */}
					<div>
						봉사점수 15점 이상부터 그룹장이 될 수 있어요. <br />
						현재 내 봉사점수는? 3점
					</div>
					<ButtonDiv>
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
				<CommunityCard
					src="https://img.animalplanet.co.kr/news/2020/05/20/700/i1p635cwwv69537o1q86.jpg"
					name="유기견 팀"
					place="서울시 광진구"
					intro="매주 주말 즐거운 유기견 봉사 함께하실 분!"
					hashtag="#유기견 #주말봉사"
					category={<SvgIcon component={PetsIcon} style={{ marginTop: "5px" }} />}
				/>
			</Container>
		</>
	);
}
