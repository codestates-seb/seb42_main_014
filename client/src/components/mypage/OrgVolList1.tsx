import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
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
	ol {
		padding-left: 30px;
	}
	& > div:first-child {
		/* border-bottom: 1px solid #000000; */
	}
`;

export default function OrgVolList() {
	const [Vol, setVol] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const org = await myPageGet("volunteers/organization");
			const Vol = org.data;
			setVol(Vol);

			// setTitle(JSON.stringify(plan.data[0].volunteerName).replace(/"/g, ""));
			// setName(JSON.stringify(plan.data[0].organizationName).replace(/"/g, ""));
		};
		fetchData();
	}, []);
	return (
		<>
			<Container>
				<div>
					<h2>봉사 활동 신청인 현황</h2>
					<ol>
						{/* 신청 받고있는 봉사 활동 리스트 */}
						{Vol.length ? (
							Vol.map((v) => (
								<li key={v.likeId}>
									<OrgVolItem1
										title={v.title}
										time={v.applyDate}
										id={v.volunteerId}
										limit={v.applyLimit}
									/>
								</li>
							))
						) : (
							<p>등록한 게시물이 없습니다.</p>
						)}
					</ol>
				</div>
			</Container>
		</>
	);
}
