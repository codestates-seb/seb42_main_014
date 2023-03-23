import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
import Modal from "../Modal";
import Paginations from "../Pagination";
import User from "./User";

interface ItemProps {
	title: string;
	time: string;
	id: string;
	limit: string;
	count: number;
}

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
const FlexLi = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: fit-content;
`;
const ModalStyle = styled.div`
	position: fixed;
	left: 0%;
	top: 0%;
`;

export default function OrgVolItem1(props: ItemProps) {
	const [isOpen, setisOpen] = useState(false);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};
	const toggle = () => {
		setisOpen(!isOpen);
	};
	const [Vol, setVol] = useState<any[]>([]);
	const date = props.time.split("T")[0];

	useEffect(() => {
		const fetchData = async () => {
			const org = await myPageGet(`apply/organization/${props.id}`);
			setTotalPages(props.count);
			const Vol = org.data;
			setVol(Vol);
		};
		fetchData();
	}, [props.count, props.id]);
	return (
		<>
			<Container>
				<div>{props.title}</div>
				<div>일자 :{date}</div>
				<div onClick={toggle}>
					신청 인원 현황 : {props.count}/{props.limit}
				</div>
			</Container>
			<ModalStyle>
				<Modal isOpen={isOpen} toggle={toggle}>
					<h1>신청 인원 현황</h1>
					<FlexLi>
						{Vol.length ? (
							Vol.map((v) => (
								<div key={v.id}>
									<User name={v.memberName} emali={v.memberEmail} />
								</div>
							))
						) : (
							<p>신청한 인원이 없습니다.</p>
						)}
					</FlexLi>
					<Paginations
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						itemsCountPerPage={5}
					/>

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
