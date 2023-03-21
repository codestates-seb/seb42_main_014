import { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "../../components/community/Comment";
import GroupInfo from "../../components/community/GroupInfo";
import GroupMember from "../../components/community/GroupMember";
import { myPageGet } from "../../api/mypage/MypageGet";

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

export default function CommunityDetail() {
	const [groupData, setGroupData] = useState({});

	useEffect(() => {
		const getGroupDetailData = async () => {
			const result = await myPageGet(`groups/${1}`);
			setGroupData(result.data);
		};
		getGroupDetailData();
	}, []);

	return (
		<StyledGroupDetailContainer>
			<GroupInfo groupData={groupData} />
			<div className="layout-child">
				<GroupMember />
				<div className="cmt">
					<Comment />
				</div>
			</div>
		</StyledGroupDetailContainer>
	);
}
