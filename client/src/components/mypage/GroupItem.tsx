import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	& > div:first-child {
		width: 140px;
	}
	button {
		color: #ffffff;
		background-color: #000000;
		border-radius: 30px;
		padding: 2px 20px;
	}
`;

export default function GroupItem() {
	return (
		<>
			<Container>
				<div>레전드 </div>
				<div>
					<button>내 그룹 가기</button>
				</div>
			</Container>
		</>
	);
}
