import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";
import { StyledProfileImgContainer } from "./GroupComment";

const StyledContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 20%;
	height: fit-content;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	min-width: 320px;
	section {
		margin: 10px;
		width: 100%;
		height: 400px;
		min-width: 300px;
		overflow-y: scroll;
		overflow-x: hidden;
		::-webkit-scrollbar {
			width: 10px;
		}

		::-webkit-scrollbar-thumb {
			height: 30%;
			background: #131313;
			border-radius: 10px;
		}
		::-webkit-scrollbar-track {
			background: rgba(93, 93, 93, 0.1);
		}
	}
	.layout {
		display: flex;
		align-items: center;
		padding: 10px;
		min-width: 300px;
	}
`;
const GroupMemberContainer = styled.div`
	display: flex;
	padding: 10px;
	align-items: center;
	justify-content: flex-start;
	margin-left: 10px;
`;
const GroupMemberInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-right: 15px;
`;
export default function GroupMember({ groupId, groupData }: any) {
	const [getGroupMemberData, setGetGroupMemberData] = useState([]);

	useEffect(() => {
		const getGroupDetailData = async () => {
			const result = await myPageGet(`member-groups/${groupId}/details`);
			setGetGroupMemberData(result.data);
		};
		getGroupDetailData();
	}, []);

	return (
		<StyledContainerDiv>
			<section>
				<div className="layout">
					<MdGroup size={30} />
					<span style={{ marginLeft: "10px", fontSize: "18px" }}>그룹원</span>
				</div>

				{getGroupMemberData &&
					getGroupMemberData.map((el) => {
						const { member_id, member_name, point_count, profileImage } = el;
						return (
							<GroupMemberContainer key={member_id}>
								<StyledProfileImgContainer>
									{profileImage ? (
										<img src={profileImage} alt="프로필사진" />
									) : (
										<FaUserCircle size={50} />
									)}
								</StyledProfileImgContainer>
								<GroupMemberInfo>
									<div style={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
										{member_name}
										<span style={{ color: "red", fontWeight: "700", fontSize: "13px" }}>
											{member_id === groupData.groupZangId ? "(그룹장)" : null}
										</span>
									</div>
									<div>{point_count}점</div>
								</GroupMemberInfo>
							</GroupMemberContainer>
						);
					})}
			</section>
		</StyledContainerDiv>
	);
}
