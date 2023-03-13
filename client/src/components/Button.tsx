import { ReactElement } from "react";
import styled from "styled-components";

interface TPropsButton {
	value: string;
	width: number;
	height: number;
	radius: number;
	textSize: number;
	bgColor: string | number;
	iconName?: ReactElement<any, any> | undefined;
}

export default function Button({
	value,
	width,
	height,
	radius,
	textSize,
	bgColor,
	iconName,
}: TPropsButton) {
	const StyledButtonContainer = styled.div`
		width: ${width}px;
		height: ${height}px;
		border-radius: ${radius}px;
		font-size: ${textSize}px;
		background-color: black;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		button {
			background-color: ${bgColor};
			border: none;
			color: white;
			cursor: pointer;
		}

		:hover,
		button:hover {
			font-size: ${textSize + 0.2}px;
			transition: all 0.3s;
		}
	`;
	return (
		<StyledButtonContainer>
			{iconName}
			<button>{value}</button>
		</StyledButtonContainer>
	);
}
