import styled from "styled-components";

export default function VolunteerDetail() {
	const StyledContainerDiv = styled.div`
		width: 80vw;
		height: 100vh;
		background-color: blue;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	`;
	return (
		<StyledContainerDiv>
			<div>봉사 정보</div>
			<div>상세 정보</div>
			<div>답변 컴포넌트</div>
		</StyledContainerDiv>
	);
}
