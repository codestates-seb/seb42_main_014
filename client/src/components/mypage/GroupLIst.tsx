import styled from "styled-components";
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
	return (
		<>
			<Container>
				<div>
					<h2>내가 속한 그룹</h2>
					<ol>
						{/* 그룹 리스트 */}
						<li>
							<GroupItem />
						</li>
					</ol>
				</div>
			</Container>
		</>
	);
}
