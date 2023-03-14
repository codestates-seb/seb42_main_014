import styled from "styled-components";
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
						{/* 봉사 활동 신청 리스트 */}
						<li>
							<UserVolItem2 />
						</li>
					</ol>
				</div>
			</Container>
		</>
	);
}
