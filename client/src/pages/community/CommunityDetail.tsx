import { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "../../components/community/Comment";
import GroupInfo from "../../components/community/GroupInfo";
import GroupMember from "../../components/community/GroupMember";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useLocation } from "react-router-dom";
import UnregisterButton from "../../components/community/UnregisterButton";

const Body = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	min-height: 1200px;
	min-width: 800px;
	margin-bottom: 80px;
	.layout-child {
		display: flex;
		min-width: 910px;
	}
	.cmt {
		width: 90%;
		padding-left: 10px;
	}
`;
const ButtonDiv = styled.div`
	margin-top: 30px;
	width: 100%;
	display: flex;
	justify-content: right;
`;

const StyledGroupDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export default function CommunityDetail() {
	const [groupData, setGroupData] = useState({});
	const [groupZang, setGroupZang] = useState(null);
	const [myId, setMyId] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const getGroupDetailData = async () => {
			const result = await myPageGet(`groups/${location.state}`);
			setGroupData(result.data);
			setGroupZang(result.data.groupZangId);
		};
		getGroupDetailData();
	}, [location.state]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet("members/me");
			setMyId(result.data.memberId);
		};
		fetchData();
	}, []);

	return (
		<Body>
			<StyledGroupDetailContainer>
				<GroupInfo groupData={groupData} />
				<div className="layout-child">
					<GroupMember groupData={groupData} groupId={location.state} />
					<div className="cmt">
						<Comment />
					</div>
				</div>
				{groupZang === myId ? (
					<ButtonDiv>
						<UnregisterButton
							meg={"정말 삭제하시겠어요? 모든 자료는 복구되지 않아요."}
							name={"그룹삭제"}
							quri={`groups/${location.state}`}
						/>
					</ButtonDiv>
				) : null}
			</StyledGroupDetailContainer>
		</Body>
	);
}
