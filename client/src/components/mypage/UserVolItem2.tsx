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

export default function UserVolItem2() {
	return (
		<>
			<Container>
				<div>깨끗한 길거리 만들기 </div>
				<div>일자 : 2023-03-09</div>
				<div>
					<button>봉사취소</button>
				</div>
			</Container>
		</>
	);
}
