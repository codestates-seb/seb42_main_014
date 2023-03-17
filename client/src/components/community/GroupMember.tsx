import { FaUserCircle } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import styled from "styled-components";

export default function GroupMember() {
	const members = [
		{
			name: "임성은",
			role: "그룹장",
			score: 20,
		},
		{
			name: "장지우",
			role: "그룹원",
			score: 3,
		},
		{
			name: "박주혁",
			role: "그룹원",
			score: 5,
		},
	];
	const StyledContainerDiv = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 20%;
		height: fit-content;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
		min-width: 300px;

		section {
			margin: 10px;
			width: 100%;
			height: 400px;
			min-width: 300px;
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
		justify-content: center;
	`;
	return (
		<StyledContainerDiv>
			<section>
				<div className="layout">
					<MdGroup size={30} />
					<span style={{ marginLeft: "10px", fontSize: "18px" }}>그룹원</span>
				</div>

				{members &&
					members.map((el) => {
						return (
							<GroupMemberContainer>
								<FaUserCircle size={35} />
								<div style={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
									{el.name}
									<span style={{ color: "red", fontWeight: "700", fontSize: "13px" }}>
										{el.role === "그룹장" ? "(그룹장)" : null}
									</span>
								</div>
								<div
									style={{
										width: "55%",
										textAlign: "end",
									}}
								>
									{el.score}점
								</div>
							</GroupMemberContainer>
						);
					})}
			</section>
		</StyledContainerDiv>
	);
}
