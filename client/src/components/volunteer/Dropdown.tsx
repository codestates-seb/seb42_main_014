import { SetStateAction, useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
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
	width: 200px;

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

interface IPropsDropDown {
	option?: string[];
	onChange?: any;
	placeholder?: string;
	style?: React.CSSProperties | undefined;
	width?: number;
	radius?: number;
	height?: number;
	boxWidth?: number;
	max_min_width?: number;
	setSelectedOption?: React.Dispatch<React.SetStateAction<string>> | undefined;
	selectedOption?: string | undefined;
}

const DropdownMenu = ({
	option,
	placeholder,
	style,
	width,
	radius,
	height,
	boxWidth,
	max_min_width,
	setSelectedOption,
	selectedOption,
}: IPropsDropDown) => {
	const DropdownButton = styled.button`
		background-color: #072e00;
		width: ${width ? width : 100}%;
		font-weight: 700;
		color: #ffffff;
		padding: 12px;
		border: 3px solid #ececec;
		cursor: pointer;
		border-radius: ${radius ? radius : 0}px;
		height: ${height ? height : null}px;
		max-width: ${max_min_width}px;
		min-width: ${max_min_width}px;
	`;

	const [isOpen, setIsOpen] = useState(false);

	const handleOptionClick = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<DropdownContainer>
			<DropdownButton onClick={toggleDropdown}>{selectedOption || placeholder}</DropdownButton>
			{isOpen && (
				<DropdownContent>
					{option &&
						option.map((el: any) => {
							return (
								<button style={style} onClick={() => handleOptionClick(el)}>
									{el}
								</button>
							);
						})}
				</DropdownContent>
			)}
		</DropdownContainer>
	);
};

export default DropdownMenu;
