import styled from "styled-components";
import Comment from "../../components/community/Comment";
import GroupInfo from "../../components/community/GroupInfo";
import GroupMember from "../../components/community/GroupMember";

export default function GroupDetail() {
	const StyledGroupDetailContainer = styled.div`
		margin-bottom: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		.layout-child {
			display: flex;
			flex-direction: row;
			margin-top: 20px;
			width: 50%;
			justify-content: space-between;
		}
		.cmt {
			width: 90%;
			padding-left: 5%;
		}
	`;
	return (
		<StyledGroupDetailContainer>
			<GroupInfo />
			<div className="layout-child">
				<GroupMember />
				<div className="cmt">
					<Comment />
				</div>
			</div>
		</StyledGroupDetailContainer>
	);
}
