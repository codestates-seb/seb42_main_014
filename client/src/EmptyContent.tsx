import Lottie from "lottie-react";
import styled from "styled-components";
import errorLottie from "./errorLottie.json";

const EmptyContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	align-items: center;
	margin: 20px;
	div {
		width: 400px;
		height: 400px;
	}
	span {
		position: absolute;
		bottom: 330px;
		z-index: 1;
		font-size: 20px;
		font-weight: 900;
	}
`;
export const EmptyContent = (props: { content: string }) => {
	return (
		<EmptyContainer>
			<span>{`${props.content}`}</span>
			<div>
				<Lottie animationData={errorLottie} />
			</div>
		</EmptyContainer>
	);
};
