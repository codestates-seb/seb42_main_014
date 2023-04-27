import styled from "styled-components";
import VolunteerComment from "../../components/volunteer/VolunteerComment";
import VolunteerInfo from "../../components/volunteer/VolunteerInfo";
const StyledContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 150px;
	min-width: 1035px;
`;
const Flex = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 150px;
	width: 50%;
`;

export default function VolunteerDetail() {
	return (
		<StyledContainerDiv>
			<Flex>
				<VolunteerInfo />
				<VolunteerComment />
			</Flex>
		</StyledContainerDiv>
	);
}
