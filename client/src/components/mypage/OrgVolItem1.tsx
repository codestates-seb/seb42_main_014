import { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";

const Container = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 5px;
	& > div:first-child {
		width: 140px;
	}
	div:last-child {
		cursor: pointer;
	}
`;
const Flex = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
	align-items: center;
	button {
		color: #ffffff;
		background-color: #000000;
		border-radius: 30px;
		padding: 5px;
		width: 100%;
	}
`;
const ModalStyle = styled.div`
	position: fixed;
	left: 0%;
	top: 0%;
`;

export default function OrgVolItem1() {
	const [isOpen, setisOpen] = useState(false);
	const toggle = () => {
		setisOpen(!isOpen);
	};
	return (
		<>
			<Container>
				<div>유기견 산책 시키기</div>
				<div>일자 : 2023-03-07</div>
				<div onClick={toggle}>신청 인원 현황 : 4/8</div>
			</Container>
			<ModalStyle>
				<Modal isOpen={isOpen} toggle={toggle}>
					<h1>신청 인원 현황</h1>
					<Flex>
						<button type="button" onClick={toggle}>
							확인
						</button>
					</Flex>
				</Modal>
			</ModalStyle>
		</>
	);
}
