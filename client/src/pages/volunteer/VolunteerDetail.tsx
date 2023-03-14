import styled from "styled-components";
import VolunteerComment from "../../components/volunteer/VolunteerComment";
import VolunteerInfo from "../../components/volunteer/VolunteerInfo";

export default function VolunteerDetail() {
	const StyledContainerDiv = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 150px;
		min-width: 1035px;
	`;
	return (
		<StyledContainerDiv>
			<VolunteerInfo />
			<VolunteerComment />
		</StyledContainerDiv>
	);
}
