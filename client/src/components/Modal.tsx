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
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ModalBox = styled.div`
	display: block;
	background: white;
	width: 25%;
	min-width: 300px;
	height: 500px;
	padding: 1.5rem;
	border-radius: 1rem;
	margin-bottom: 10%;
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
