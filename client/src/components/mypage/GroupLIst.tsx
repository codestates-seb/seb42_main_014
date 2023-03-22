import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
import GroupItem from "./GroupItem";

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

	useEffect(() => {
		const fetchData = async () => {
			const plan = await myPageGet("member-groups");
			const data = plan.data;
			setGroup(data);

			// setTitle(JSON.stringify(plan.data[0].volunteerName).replace(/"/g, ""));
			// setName(JSON.stringify(plan.data[0].organizationName).replace(/"/g, ""));
		};
		fetchData();
	}, []);
	return (
		<>
			<Container>
				<div>
					<h2>내가 속한 그룹</h2>
					<ol>
						{/* 그룹 리스트 */}
						{group.length ? (
							group.map((g) => (
								<li key={g.likeId}>
									<GroupItem title={g.group_name} id={g.group_id} />
								</li>
							))
						) : (
							<p>속한 그룹이 없습니다.</p>
						)}
					</ol>
				</div>
			</Container>
		</>
	);
}
