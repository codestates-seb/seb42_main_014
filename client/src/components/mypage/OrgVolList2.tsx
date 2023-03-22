import { useEffect, useState } from "react";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
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

	useEffect(() => {
		const fetchData = async () => {
			const org = await myPageGet("volunteers/organization");
			const Vol = org.data;
			setVol(Vol);
		};
		fetchData();
	}, []);
	return (
		<>
			<Container>
				<div>
					<h2>내 게시물 관리</h2>
					<ol>
						{Vol.length ? (
							Vol.map((v) => (
								<li key={v.likeId}>
									<OrgVolItem2 title={v.title} time={v.applyDate} id={v.volunteerId} />
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
