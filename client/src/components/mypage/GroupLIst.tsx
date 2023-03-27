import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
import GroupItem from "./GroupItem";
import Pagination from "./MyPagePagination";

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

export default function GroupList() {
	const [group, setGroup] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 3;

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await myPageGet(`member-groups`);
			const data = res.data;
			setGroup(data);
			setTotalPages(Math.ceil(data.length / itemsPerPage));
		};
		fetchData();
	}, [itemsPerPage]);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const itemsToShow = group.slice(startIndex, endIndex);

	return (
		<>
			<Container>
				<div>
					<h2>내가 속한 그룹</h2>
					<ol>
						{itemsToShow.length ? (
							itemsToShow.map((g) => (
								<li key={g.likeId}>
									<GroupItem title={g.group_name} id={g.group_id} />
								</li>
							))
						) : (
							<p>해당 페이지에 아이템이 없습니다.</p>
						)}
					</ol>
					<Pagination
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						itemsCountPerPage={itemsPerPage}
					/>
				</div>
			</Container>
		</>
	);
}
