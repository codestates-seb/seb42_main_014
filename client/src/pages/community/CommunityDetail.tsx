import { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "../../components/community/Comment";
import GroupInfo from "../../components/community/GroupInfo";
import GroupMember from "../../components/community/GroupMember";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useLocation } from "react-router-dom";

const StyledGroupDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
	margin-bottom: 100px;
	min-width: 800px;

	.layout-child {
		display: flex;
	}
	.cmt {
		width: 90%;
		padding-left: 10px;
	}
`;

export default function CommunityDetail() {
	const [groupData, setGroupData] = useState({});
	const location = useLocation();

	useEffect(() => {
		const getGroupDetailData = async () => {
			const result = await myPageGet(`groups/${location.state}`);
			setGroupData(result.data);
		};
		getGroupDetailData();
	}, []);
	return (
		<StyledGroupDetailContainer>
			<GroupInfo groupData={groupData} />
			<div className="layout-child">
				<GroupMember groupData={groupData} groupId={location.state} />
				<div className="cmt">
					<Comment />
				</div>
			</div>
		</StyledGroupDetailContainer>
	);
}
