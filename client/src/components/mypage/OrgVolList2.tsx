import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet2 } from "../../api/mypage/MypageGet";
import Paginations from "../Pagination";
import OrgVolItem2 from "./OrgVolItem2";

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
	ol {
		padding-left: 30px;
	}
`;

export default function OrgVolManage() {
	const [Vol, setVol] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const fetchData = async () => {
			const org = await myPageGet2(`volunteers/organization?pageNum=${currentPage}`);
			const Vol = org.data;
			setVol(Vol);
			const url = await myPageGet2("volunteers/organization?pageNum=1");
			setTotalPages(url.data.length * url.totalPages);
		};
		fetchData();
	}, [currentPage]);
	return (
		<>
			<Container>
				<div>
					<h2>내 게시물 관리</h2>
					<ol>
						{Vol.length ? (
							Vol.map((item) => (
								<li key={item.Id}>
									<OrgVolItem2 title={item.title} time={item.applyDate} id={item.volunteerId} />
								</li>
							))
						) : (
							<p>등록한 게시물이 없습니다.</p>
						)}
					</ol>
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
