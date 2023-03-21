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

export default function UserVolItem1() {
	return (
		<>
			<Container>
				<div>타이틀</div>
				<div>일자 : </div>
				<div>
					<button>후기작성</button>
				</div>
			</Container>
		</>
	);
}