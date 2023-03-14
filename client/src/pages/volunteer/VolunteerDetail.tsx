import styled from "styled-components";
import VolunteerAnswer from "../../components/volunteer/VolunteerAnswer";
import VolunteerInfo from "../../components/volunteer/VolunteerInfo";

export default function VolunteerDetail() {
	const StyledContainerDiv = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 150px;
	`;
	return (
		<StyledContainerDiv>
			<VolunteerInfo />
			<VolunteerAnswer />
		</StyledContainerDiv>
	);
}
