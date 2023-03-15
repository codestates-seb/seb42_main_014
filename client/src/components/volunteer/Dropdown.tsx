import { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;
`;

const DropdownButton = styled.button`
	background-color: #494949;
	width: 100%;
	font-weight: 700;
	color: #ffffff;
	padding: 12px;
	font-size: 16px;
	border: 3px solid #ececec;
	cursor: pointer;
`;

const DropdownContent = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	z-index: 1;
	background-color: #ffffff;
	min-width: 160px;
	overflow: auto;
	border: 2px solid #eaeaea;
	border-top: none;

	button {
		background-color: inherit;
		color: black;
		padding: 12px 16px;
		border: none;
		cursor: pointer;
		width: 100%;
		text-align: left;

		&:hover {
			background-color: #ddd;
		}
	}
`;

const DropdownMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");

	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<DropdownContainer>
			<DropdownButton onClick={toggleDropdown}>
				{selectedOption || "분야를 선택해주세요"}
			</DropdownButton>
			{isOpen && (
				<DropdownContent>
					<button onClick={() => handleOptionClick("어린이")}>어린이</button>
					<button onClick={() => handleOptionClick("노인")}>노인</button>
					<button onClick={() => handleOptionClick("장애인")}>장애인</button>
					<button onClick={() => handleOptionClick("환경")}>환경</button>
					<button onClick={() => handleOptionClick("사회")}>사회</button>
					<button onClick={() => handleOptionClick("동물")}>동물</button>
				</DropdownContent>
			)}
		</DropdownContainer>
	);
};

export default DropdownMenu;
