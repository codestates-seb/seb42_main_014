import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
import Paginations from "../Pagination";
import OrgVolItem1 from "./OrgVolItem1";

const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	width: 100%;
	box-shadow: 0px 0px 10px 1px #dbdbdb;
	border-radius: 10px;
	padding: 20px 40px;
	margin-bottom: 30px;
	h2 {
		font-size: 1.3rem;
	}
	li {
		list-style-type: none;
	}
	& > div:first-child {
		/* border-bottom: 1px solid #000000; */
	}
`;

export default function OrgVolList() {
	const [Vol, setVol] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const fetchData = async () => {
			const org = await myPageGet(`volunteers/organization?pageNum=${currentPage}`);
			const Vol = org.data;
			setVol(Vol);
			const url = await myPageGet("volunteers/organization?pageNum=1");
			setTotalPages(url.data.length * url.totalPages);
		};
		fetchData();
	}, [currentPage]);
	return (
		<>
			<Container>
				<div>
					<h2>봉사 활동 신청인 현황</h2>
					<div>
						{Vol.length ? (
							Vol.map((v) => (
								<li key={v.likeId}>
									<OrgVolItem1
										title={v.title}
										count={v.applyCount}
										time={v.applyDate}
										id={v.volunteerId}
										limit={v.applyLimit}
									/>
								</li>
							))
						) : (
							<p>등록한 게시물이 없습니다.</p>
						)}
					</div>
				</div>
				{Vol.length ? (
					<Paginations
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						itemsCountPerPage={5}
					/>
				) : null}
			</Container>
		</>
	);
}
