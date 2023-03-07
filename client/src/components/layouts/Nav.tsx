import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DropDown from "../MUI/DropDown";

export default function Nav() {
	const StyledNav = styled.nav`
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
			transition: all 0.3s;
		}
	`;

	const navItem = ["Home", "봉사활동", "기부가게", "About"];
	const navItemRoutingPath = ["/", "/volunteer", "/donation", "/about"];
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
			<DropDown />
		</StyledNav>
	);
}
