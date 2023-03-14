import styled from "styled-components";
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
	return (
		<>
			<Container>
				<div>
					<h2>내 게시물 관리</h2>
					<ol>
						{/* 기관 게시물 리스트 */}
						<li>
							<OrgVolItem2 />
						</li>
					</ol>
				</div>
			</Container>
		</>
	);
}
