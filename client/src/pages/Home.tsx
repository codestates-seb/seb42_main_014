import styled from "styled-components";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
	const StyledMainImgBgContainer1 = styled.section`
		display: flex;
		width: 100vw;
		height: 500px;
		position: relative;
		background-color: #ff8771;
		justify-content: center;
	`;
	const StyledMainImgBgContainer2 = styled.section`
		background-color: #f9eee1;
		display: flex;
		width: 100vw;
		height: 500px;
		position: relative;
		justify-content: center;
	`;
	const StyledMainImgBgContainer3 = styled.section`
		background-color: #8629fe;
		width: 100vw;
		height: 500px;
	`;
	const StyledEmptyLine = styled.div`
		width: 100vw;
		height: 30px;
		background-color: black;
	`;
	const StyledTitleFontSpan1 = styled.span`
		font-family: "Permanent Marker", cursive;
		font-size: 60px;
		color: #f4f4f4;
		text-shadow: 2px 2px 2px black;
	`;
	const StyledTitleFontDiv2 = styled.div`
		font-family: "Permanent Marker", cursive;
		font-size: 80px;
		color: black;
		margin-top: 10px;
		:hover {
			animation: bounce 1.5s infinite;
			transition: all 1s;
		}
		margin-bottom: 20px;
	`;
	const StyledTitleFontSpan3 = styled.span`
		font-size: 23px;
		color: #ffffff;
		animation: fadeInRight 2s;
	`;
	const StyledImgContainer = styled.div`
		width: 650px;
		background-color: rgb(0, 0, 0);
		height: 360px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
	`;
	const StyledMainImgContainer2 = styled.div`
		display: flex;
		align-items: center;
		animation: fadeInRight 2s;
		margin-left: 60px;
		position: relative;
	`;

	return (
		<div>
			<StyledMainImgBgContainer1>
				<div
					style={{
						marginTop: "20px",
						animation: "fadeInLeft 2s",
						marginRight: "40px",
						position: "relative",
					}}
				>
					<StyledTitleFontSpan1>{"Welcome Volunteer : )"}</StyledTitleFontSpan1>
					<StyledImgContainer>
						<img
							alt="아이들 사진"
							src="/images/home/main-img-1.png"
							style={{ width: "600px", height: "320px", borderRadius: "20px" }}
						/>
						<img
							style={{ position: "absolute", left: "570px", bottom: "250px" }}
							src="/images/home/flame1.webp"
							alt="불꽃아이콘"
						/>
					</StyledImgContainer>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						marginBottom: "30px",
					}}
				>
					<StyledTitleFontSpan3>
						당신이 줄 수 있는 최고의 선물은 당신의 시간이예요.
						<br />
						One of the greatest gifts you can give is your time.
					</StyledTitleFontSpan3>
					<Link to="/volunteer">
						<StyledTitleFontDiv2>
							Start Now <FaArrowRight style={{ justifyContent: "end" }} size={50} />
						</StyledTitleFontDiv2>
					</Link>
				</div>
			</StyledMainImgBgContainer1>
			<StyledEmptyLine />
			<StyledMainImgBgContainer2>
				<div
					style={{
						display: "flex",
						position: "relative",
						flexDirection: "column",
						justifyContent: "flex-end",
						marginBottom: "30px",
					}}
				>
					<img
						src="/images/home/group.png"
						alt="그룹 아이콘"
						style={{
							position: "absolute",
							width: "80px",
							top: "170px",
							animation: "fadeInLeft 2s",
						}}
					/>
					<StyledTitleFontSpan3 style={{ animation: "fadeInLeft 2s", color: "black" }}>
						관심 분야에 맞는 봉사활동을 추천받고, <br />
						그룹활동을 통해 마음맞는 사람들과 함께할 수 있어요.
					</StyledTitleFontSpan3>
					<Link to="/volunteer">
						<StyledTitleFontDiv2>
							<FaArrowLeft style={{ justifyContent: "end" }} size={50} /> Community
						</StyledTitleFontDiv2>
					</Link>
				</div>
				<StyledMainImgContainer2>
					<StyledImgContainer>
						<img
							alt="커뮤니티 사진"
							src="/images/home/main-img-2.png"
							style={{ width: "600px", height: "320px", borderRadius: "20px" }}
						/>
					</StyledImgContainer>
				</StyledMainImgContainer2>
			</StyledMainImgBgContainer2>
			<StyledEmptyLine />
			<StyledMainImgBgContainer3></StyledMainImgBgContainer3>
		</div>
	);
}
