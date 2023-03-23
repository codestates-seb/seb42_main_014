import styled from "styled-components";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { SiVelog } from "react-icons/si";

const StyledAboutImgContainer = styled.div`
	background-color: #767ec6;
	width: 100vw;
	height: 300px;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
`;

const StyledAboutTitleSpan = styled.span`
	@media (max-width: 558px) {
		font-size: 50px;
	}
	font-size: 60px;
	font-weight: 900;
	color: #2b2b2b;
	font-family: "Rock Salt", cursive;
	margin: 10px 0px 10px 50px;
	animation: fadeinDown 2.5s;
`;

const StyledAboutContentSpan = styled.span`
	color: #dddddd;
	font-size: 20px;
	font-weight: 700;
	margin-left: 50px;
	animation: fadeinDown 2.5s;
`;

const StyledMemberContainer = styled.div`
	background-color: #383838;
	height: 250px;
	width: 100vw;
	border: solid black 1px;
	display: flex;
	align-items: center;
	color: white;
	font-size: 18px;
	animation: fadeInLeft 2s;
`;

const StyledMemberImgContainer = styled.div`
	width: 180px;
	height: 180px;
	border-radius: 50%;
	/* border: 4px solid black; */
	background-color: white;
	margin-left: 100px;
	overflow: hidden;
`;

const DeveloperImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export default function About() {
	const github = "https://github.com";
	const insta = "https://www.instagram.com";
	const members = [
		{
			name: "박주혁",
			avatarUrl: "/images/about/박주혁.jpg",
			position: "FE Developer",
			githubUrl: `${github}/Juhyuk-Park`,
			blogUrl: "",
			instaUrl: `${insta}/effelf`,
		},
		{
			name: "임성은",
			avatarUrl: "/images/about/임성은.jpg",
			position: "FE Developer",
			githubUrl: `${github}/Limcroco`,
			blogUrl: "https://velog.io/@se2id",
			instaUrl: null,
		},
		{
			name: "장지우",
			avatarUrl: "/images/about/장지우.jpeg",
			position: "FE Developer",
			githubUrl: `${github}/jellyjw`,
			blogUrl: "https://velog.io/@jellyjw",
			instaUrl: `${insta}/fallj_`,
		},
		{
			name: "강은서",
			avatarUrl: "/images/about/강은서.jpeg",
			position: "BE Developer",
			githubUrl: `${github}/kdmstj`,
			blogUrl: "https://kangkangsulae.tistory.com/",
			instaUrl: `${insta}/k_dmstj_`,
		},
		{
			name: "김민소",
			avatarUrl: "/images/about/김민소.jpg",
			position: "BE Developer",
			githubUrl: `${github}/kms310272`,
			blogUrl: "https://minso-dev.tistory.com/",
			instaUrl: `${insta}/bella.m.kim/`,
		},
		{
			name: "이우연",
			avatarUrl: "/images/about/이우연.jpg",
			position: "BE Developer",
			githubUrl: `${github}/`,
			blogUrl: "",
			instaUrl: "",
		},
	];

	return (
		<div style={{ maxWidth: "100%" }}>
			<StyledAboutImgContainer>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyItems: "center",
						position: "absolute",
					}}
				>
					<div className="display-none-small" style={{ display: "flex", flexDirection: "column" }}>
						<StyledAboutTitleSpan>Who Are We ?</StyledAboutTitleSpan>
						<StyledAboutContentSpan>
							우리는 모두가 행복한 사회를 꿈꿔요. <br />
							We dream of a society where everyone is happy.
						</StyledAboutContentSpan>
					</div>
					<div className="display-none" style={{ animation: "fadeInRight 3s" }}>
						<img src="/images/about/test.png" alt="봉사자아이콘" style={{ width: "305px" }} />
						<img src="/images/about/world.png" alt="지구본아이콘" style={{ width: "330px" }} />
					</div>
				</div>
			</StyledAboutImgContainer>
			<div style={{ marginBottom: "80px" }}>
				{members &&
					members.map((el, idx) => {
						const { name, avatarUrl, position, githubUrl, blogUrl, instaUrl } = el;
						return (
							<StyledMemberContainer key={idx}>
								<StyledMemberImgContainer
									style={{
										border: position.includes("FE") ? "4px solid #f36e56" : "4px solid #6166f4",
									}}
								>
									<DeveloperImg src={avatarUrl} alt={"개발자 이미지"} />
								</StyledMemberImgContainer>
								<div style={{ display: "flex", flexDirection: "column", margin: "30px" }}>
									<span style={{ marginBottom: "6px", fontSize: "25px" }}>{name}</span>
									<span style={{ color: position.includes("FE") ? "#ff7259" : "#abaeff" }}>
										{position}
									</span>
									<div style={{ marginTop: "15px" }}>
										<a
											target={"_blank"}
											rel="noreferrer"
											href={githubUrl}
											style={{ color: "white", marginRight: "20px" }}
										>
											<BsGithub className="icon-hover" size={30} style={{}} />
										</a>
										<a
											target={"_blank"}
											rel="noreferrer"
											href={instaUrl}
											style={
												!instaUrl ? { display: "none" } : { color: "white", marginRight: "20px" }
											}
										>
											<BsInstagram className="icon-hover" size={30} />
										</a>
										<a
											target={"_blank"}
											rel="noreferrer"
											href={blogUrl}
											style={
												!blogUrl ? { display: "none" } : { color: "white", marginRight: "20px" }
											}
										>
											<SiVelog className="icon-hover" size={30} />
										</a>
									</div>
								</div>
							</StyledMemberContainer>
						);
					})}
			</div>
		</div>
	);
}
