import styled from "styled-components";
import Paginations from "../Pagination";
import KeepVolItem from "./KeepVolItem";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useEffect, useState } from "react";

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
`;

export default function KeepVolList() {
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [likes, setLikes] = useState<any[]>([]);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const fetchData = async () => {
			const plan = await myPageGet(`likes/my?pageNum=${currentPage}`);
			const page = await myPageGet(`likes/my?pageNum=1`);
			const likes = plan.data;
			console.log(likes);
			setLikes(likes);
			setTotalPages(page.data.length * plan.totalPages);

			// setTitle(JSON.stringify(plan.data[0].volunteerName).replace(/"/g, ""));
			// setName(JSON.stringify(plan.data[0].organizationName).replace(/"/g, ""));
		};
		fetchData();
	}, [currentPage]);
	return (
		<>
			<Container>
				<div>
					<h2>찜한 봉사 목록</h2>
					<div>
						{/* 찜한 봉사 리스트 */}
						{likes.length ? (
							likes.map((like) => (
								<li key={like.likeId}>
									<KeepVolItem
										title={like.volunteerName}
										name={like.organizationName}
										id={like.volunteerId}
									/>
								</li>
							))
						) : (
							<p>찜한 게시물이 없습니다.</p>
						)}
					</div>
					{likes.length ? (
						<Paginations
							totalPages={totalPages}
							currentPage={currentPage}
							onPageChange={handlePageChange}
							itemsCountPerPage={5}
						/>
					) : null}
				</div>
			</Container>
		</>
	);
}
