import styled from "styled-components";
import Button from "../../components/Button";
import { useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiOutlineShareAlt } from "react-icons/ai";

export default function VolunteerInfo() {
	const StyledContainerDiv = styled.div`
		width: 75vw;
		align-items: center;
		justify-content: center;
		margin: 20px;
		display: flex;
		flex-direction: column;
		min-width: 1035px;

		img {
			border-radius: 10px;
			margin: 20px;
		}

		div > span {
			margin-bottom: 20px;
			font-size: 16px;
		}

		button {
			background-color: white;
			border: 1px solid gray;
			cursor: pointer;
		}

		.button-container {
			display: flex;
			width: 290px;
			border: 1px solid gray;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}
	`;
	const StyledEmptyLineDiv = styled.div`
		width: 75vw;
		background-color: black;
		height: 50px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 1035px;
	`;

	const [isLike, setIsLike] = useState(false);

	return (
		<StyledContainerDiv>
			<section
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img
					src="/images/home/main-img-1.png"
					style={{ width: "500px", height: "400px" }}
					alt="봉사 타이틀 사진"
				/>
				<div style={{ display: "flex", flexDirection: "column", marginLeft: "40px" }}>
					<h2>깨끗한 길거리 다같이 만들어요.</h2>
					<span>모집 기간 : 2023.03.08 ~ 2023.03.15</span>
					<span>봉사 장소 : 서울 광화문 광장</span>
					<span>봉사 시간 : 2시간 ~ 4시간</span>
					<span>모집 인원 : 1 / 12</span>
					<Button
						value="나도 할래!"
						width={350}
						height={50}
						radius={0}
						bgColor="#b30f0fb9"
						textSize={15}
					/>
					<div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
						<button onClick={() => setIsLike(!isLike)}>
							{!isLike ? <FcLikePlaceholder size={40} /> : <FcLike size={40} />}
						</button>
						<div className="button-container">
							<Button
								value={"너도 할래?"}
								width={200}
								height={50}
								bgColor="white"
								textColor="black"
								textSize={15}
							/>
							<AiOutlineShareAlt
								size={30}
								style={{ borderLeft: "1px solid gray", width: "200px" }}
							/>
						</div>
					</div>
				</div>
			</section>
			<StyledEmptyLineDiv>활동 정보</StyledEmptyLineDiv>
			<div style={{ height: "400px", margin: "20px" }}>
				<span style={{ fontSize: "18px" }}>
					친환경 지구시민의 정식으로 지구시민 의식을 함양하고 오염된 지구의 환경을 살리는 인성회복의
					홍익정신을 기를 수 있습니다.친환경 지구시민의 정식으로 지구시민 의식을 함양하고 오염된
					지구의 환경을 살리는 인성회복의 홍익정신을 기를 수 있습니다.친환경 지구시민의 정식으로
					지구시민 의식을 함양하고 오염된 지구의
				</span>
			</div>
			<StyledEmptyLineDiv>봉사 후기</StyledEmptyLineDiv>
		</StyledContainerDiv>
	);
}
