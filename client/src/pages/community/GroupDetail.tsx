import styled from "styled-components";
import GroupComment from "../../components/community/GroupComment";
import GroupInfo from "../../components/community/GroupInfo";
import GroupMember from "../../components/community/GroupMember";

export default function GroupDetail() {
	const StyledGroupDetailContainer = styled.div`
		margin-bottom: 100px;

		.layout-child {
			display: flex;
			width: 100vw;
			align-items: center;
			justify-content: center;
		}
	`;
	return (
		<StyledGroupDetailContainer>
			<GroupInfo />
			<div className="layout-child">
				<GroupMember />
				<GroupComment />
			</div>
		</StyledGroupDetailContainer>
	);
}
