import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
import UserVolItem1 from "./UserVolItem1";
import UserVolItem2 from "./UserVolItem2";

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
		border-bottom: 1px solid #000000;
	}
`;

export default function UserVolList() {
	const [Vol, setVol] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const plan = await myPageGet("apply/member/plan");
			console.log(plan.data);
			const Vol = plan.data;
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
					<h2>나의 봉사 활동 내역</h2>
					<ol>
						{/* 봉사 활동 리스트 */}

						<li>
							<UserVolItem1 />
						</li>
					</ol>
				</div>
				<div>
					<h2>봉사 활동 신청 현황</h2>
					<ol>
						{Vol.length ? (
							Vol.map((v) => (
								<li key={v.likeId}>
									<UserVolItem2 title={v.volunteerName} time={v.volunteerDate} />
								</li>
							))
						) : (
							<p>신청한 봉사가 없습니다.</p>
						)}
						{/* <li>
							<UserVolItem2 />
						</li> */}
					</ol>
				</div>
			</Container>
		</>
	);
}
