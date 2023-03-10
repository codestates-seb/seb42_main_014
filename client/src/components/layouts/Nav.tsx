import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DropDown from "./DropDown";
import { TbUserCircle } from "react-icons/tb";

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
	const StyledNavItemList = styled.li`
		margin: 20px;
		:hover {
			color: #f58686;
			transition: all 0.3s;
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
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const navItem = ["Home", "봉사활동", "기부가게", "About"];
	const navItemRoutingPath = ["/", "/volunteer", "/donation", "/about"];

	return (
		<StyledNav>
			<StyledLogo src="/images/main-logo.png" alt="main-logo" onClick={() => navigate("/")} />
			{navItem.map((el, idx) => (
				<StyledNavItemList key={idx} onClick={() => navigate(navItemRoutingPath[idx])}>
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
