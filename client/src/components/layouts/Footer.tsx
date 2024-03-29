import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

const Container = styled.div`
	position: relative;
	min-height: 100%;
`;
const StyledNav = styled.footer`
	display: flex;
	width: 100vw;
	background-color: #383838;
	height: 80px;
	color: white;
	list-style: none;
	font-weight: 700;
	align-items: center;
	position: absolute;
	justify-content: space-evenly;
	font-size: 16px;
	bottom: 0;
	cursor: pointer;
	z-index: auto;
`;
const StyledLogo = styled.img`
	width: 60px;
	height: 60px;
`;
const StyledList = styled.li`
	margin: 20px;
	:hover,
	&.active {
		text-decoration: underline;
		transition: all 0.3s;
		text-underline-offset: 10px;
	}
`;
export default function Footer() {
	const navItem = ["개인정보처리방침", "이용약관"];
	const navItemRoutingPath = ["/", "/"];
	const navigate = useNavigate();
	if (window.location.pathname === "/token") return null;
	return (
		<Container>
			<StyledNav>
				<StyledLogo src="/images/main-logo.png" alt="main-logo" onClick={() => navigate("/")} />
				{navItem &&
					navItem.map((el, idx) => (
						<StyledList key={idx} onClick={() => navigate(navItemRoutingPath[idx])}>
							{el}
						</StyledList>
					))}

				<a
					target={"_blank"}
					rel="noreferrer"
					href={"https://github.com/codestates-seb/seb42_main_014"}
					style={{ color: "white", marginRight: "20px" }}
				>
					<BsGithub className="icon-hover" size={30} />
				</a>
			</StyledNav>
		</Container>
	);
}
