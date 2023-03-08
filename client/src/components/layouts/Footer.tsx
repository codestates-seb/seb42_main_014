import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
	const StyledNav = styled.footer`
		display: flex;
		width: 100vw;
		background-color: #383838;
		height: 80px;
		color: white;
		list-style: none;
		font-weight: 700;
		align-items: center;
		justify-content: space-evenly;
		font-size: 16px;
		position: fixed;
		bottom: 0;
		cursor: pointer;
	`;
	const StyledLogo = styled.img`
		width: 60px;
		height: 60px;
	`;
	const StyledList = styled.li`
		margin: 20px;
		:hover {
			color: #f58686;
			transition: all 0.2s;
		}
	`;

	const navItem = ["개인정보처리방침", "이용약관"];
	const navItemRoutingPath = ["/", "/"];
	const navigate = useNavigate();

	return (
		<StyledNav>
			<StyledLogo src="/images/main-logo.png" alt="main-logo" onClick={() => navigate("/")} />
			{navItem &&
				navItem.map((el, idx) => (
					<StyledList key={idx} onClick={() => navigate(navItemRoutingPath[idx])}>
						{el}
					</StyledList>
				))}
			<BsGithub size={30} />
		</StyledNav>
	);
}
