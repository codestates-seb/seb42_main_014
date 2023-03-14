import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	& > div:first-child {
		width: 140px;
	}
`;

export default function OrgVolItem1() {
	return (
		<>
			<Container>
				<div>유기견 산책 시키기</div>
				<div>일자 : 2023-03-07</div>
				<div>신청 인원 현황 : 4/8</div>
			</Container>
		</>
	);
}
