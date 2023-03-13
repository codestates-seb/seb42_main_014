import styled from "styled-components";
import KeepVolItem from "./KeepVolItem";

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
	return (
		<>
			<Container>
				<div>
					<h2>찜한 봉사 목록</h2>
					<ol>
						{/* 찜한 봉사 리스트 */}
						<li>
							<KeepVolItem />
						</li>
					</ol>
				</div>
			</Container>
		</>
	);
}
