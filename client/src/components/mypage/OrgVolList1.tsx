import styled from "styled-components";
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
	return (
		<>
			<Container>
				<div>
					<h2>봉사 활동 신청 현황</h2>
					<ol>
						{/* 신청 받고있는 봉사 활동 리스트 */}
						<li>
							<OrgVolItem1 />
						</li>
					</ol>
				</div>
			</Container>
		</>
	);
}
