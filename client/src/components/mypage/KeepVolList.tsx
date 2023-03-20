import styled from "styled-components";
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
	ol {
		padding-left: 30px;
	}
`;

export default function KeepVolList() {
	const [likes, setLikes] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const plan = await myPageGet("likes/my");
			console.log(plan.data);
			const likes = plan.data;
			setLikes(likes);

			// setTitle(JSON.stringify(plan.data[0].volunteerName).replace(/"/g, ""));
			// setName(JSON.stringify(plan.data[0].organizationName).replace(/"/g, ""));
		};
		fetchData();
	}, []);
	return (
		<>
			<Container>
				<div>
					<h2>찜한 봉사 목록</h2>
					<ol>
						{/* 찜한 봉사 리스트 */}
						{likes.length ? (
							likes.map((like) => (
								<li key={like.likeId}>
									<KeepVolItem title={like.volunteerName} name={like.organizationName} />
								</li>
							))
						) : (
							<p>찜한 게시물이 없습니다.</p>
						)}
						{/* <li>
							<KeepVolItem />
						</li> */}
					</ol>
				</div>
			</Container>
		</>
	);
}
