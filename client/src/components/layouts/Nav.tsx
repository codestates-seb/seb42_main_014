import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropDown from "./NavDropDown";
import { TbUserCircle } from "react-icons/tb";

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
const StyledNavItemList = styled.li`
	margin: 20px;
	:hover,
	&.active {
		text-decoration: underline;
		transition: all 0.3s;
		text-underline-offset: 10px;
	}
`;
const StyledDropDownModal = styled.div`
	height: max-content;
	position: absolute;
	top: 60px;
	width: max-content;
	right: -42px;
	color: black;
	background-color: white;
	border: 1px solid gray;
	z-index: 1;
`;
export default function Nav() {
	const navItem = ["Home", "봉사활동", "커뮤니티", "About"];
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [isClicked, setIsClicked] = useState("Home");
	const navItemRoutingPath = ["/", "/volunteer", "/community", "/about"];
	if (window.location.pathname === "/token") return null;

	const handleNavItemClick = (idx: number) => {
		setIsClicked(navItem[idx]);
		navigate(navItemRoutingPath[idx]);
	};

	return (
		<StyledNav>
			<StyledLogo src="/images/main-logo.png" alt="main-logo" onClick={() => navigate("/")} />
			{navItem?.map((el, idx) => (
				<StyledNavItemList
					key={idx}
					className={isClicked === navItem[idx] ? "active" : null}
					onClick={() => handleNavItemClick(idx)}
				>
					{el}
				</StyledNavItemList>
			))}
			<div style={{ position: "relative" }}>
				<TbUserCircle className="icon-hover" size={32} onClick={() => setIsOpen(!isOpen)} />
				{isOpen && (
					<StyledDropDownModal>
						<DropDown setIsOpen={setIsOpen} isOpen={isOpen} />
					</StyledDropDownModal>
				)}
			</div>
		</StyledNav>
	);
}
