import styled from "styled-components";
import Button from "../../components/Button";
import { ReactNode } from "react";

interface TProps {
	src?: string;
	name?: string;
	place?: string;
	intro?: string;
	hashtag?: string;
	category?: ReactNode;
}

export default function CommunityCard({ src, name, place, intro, hashtag, category }: TProps) {
	const Container = styled.div`
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		width: 100%;
		min-height: 250px;
		max-height: 350px;
		border-radius: 10px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		padding: 20px 40px;
		margin-bottom: 30px;
		cursor: pointer;
		img {
			width: 100%;
			width: 417px;
			height: 273px;
			border-radius: 10px;
		}
		:hover {
			transition-duration: 700ms;
			transform: scale(1.05);
		}
	`;

	const ImgDiv = styled.div`
		margin-right: 10px;
	`;

	const ContentDiv = styled.div`
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0px 10px;
		span {
			margin-bottom: 1rem;
			font-size: 1.3rem;
		}
	`;

	const ButtonDiv = styled.div`
		display: flex;
		justify-content: right;
		align-items: flex-end;
	`;

	return (
		<>
			<Container>
				<ImgDiv>
					{/* 그룹 이미지 */}
					<img src={src} alt="그룹 이미지" />
				</ImgDiv>
				<ContentDiv>
					{/* 그룹 소개 : 이름, 위치, 소개글, 해시태그, 카테고리태그 */}
					<span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{name}</span>
					<span style={{ fontWeight: "bold" }}>{place}</span>
					<span>{intro}</span>
					<span>{hashtag}</span>
					<span>{category}</span>
				</ContentDiv>
				<ButtonDiv>
					{/* 함께하기 버튼 */}
					<Button
						value="함께하기"
						width={120}
						height={40}
						radius={10}
						textSize={17}
						bgColor="black"
					/>
				</ButtonDiv>
			</Container>
		</>
	);
}
