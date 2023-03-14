import { ReactElement } from "react";
import styled from "styled-components";

interface TPropsButton {
	value: string;
	width: number;
	height: number;
	radius?: number;
	textSize?: number;
	bgColor?: string | number;
	iconName?: ReactElement<any, any> | undefined;
	style?: any;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	type?: "button" | "submit" | "reset" | undefined;
	textColor?: string;
}

export default function Button({
	value,
	width,
	height,
	radius,
	textSize,
	bgColor,
	iconName,
	style,
	onClick,
	type,
	textColor,
}: TPropsButton) {
	const StyledButtonContainer = styled.div`
		width: ${width}px;
		height: ${height}px;
		border-radius: ${radius}px;
		background-color: ${bgColor};
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		button {
			width: ${width}px;
			height: ${height}px;
			font-size: ${textSize}px;
			background-color: ${bgColor};
			border-radius: ${radius}px;
			border: none;
			color: ${textColor ? textColor : "white"};
			cursor: pointer;
		}
	`;
	return (
		<StyledButtonContainer>
			{iconName}
			<button type={type} onClick={onClick} style={style}>
				{value}
			</button>
		</StyledButtonContainer>
	);
}
