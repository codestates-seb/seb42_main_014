import { ReactNode } from "react";
import styled from "styled-components";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	toggle: (event: any) => void;
}

const ModalOverlay = styled.div`
	z-index: 9999;
	width: 100vw;
	height: 100vh;
	position: absolute;
	display: flex;
	justify-content: center;
	/* align-items: center; */
`;
const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background: white;
	border: solid 3px black;
	width: 25%;
	min-width: 300px;
	min-height: 350px;
	height: fit-content;
	padding: 1.5rem;
	border-radius: 1rem;
	text-align: center;
`;

export default function Modal(props: ModalType) {
	return (
		<>
			{props.isOpen && (
				<ModalOverlay onClick={props.toggle}>
					<ModalBox onClick={(e) => e.stopPropagation()}>{props.children}</ModalBox>
				</ModalOverlay>
			)}
		</>
	);
}
