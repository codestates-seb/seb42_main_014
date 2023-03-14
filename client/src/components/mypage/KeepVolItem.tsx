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

export default function KeepVolItem() {
	return (
		<>
			<Container>
				<div>유기견 산책 시키기 </div>
				<div>악어단체</div>
			</Container>
		</>
	);
}
