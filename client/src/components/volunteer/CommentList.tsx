import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { CommentEdit } from "../../api/volunteer/volunteerCommentEdit ";
import { StyledProfileImgContainer } from "../community/GroupComment";

interface Iprops {
	content: string;
	memberName: string;
	time: string;
	onClick: any;
	id: any;
	myId: any;
	editComment: (id: any) => void;
	profileImage?: string;
}
const Comment = styled.div`
	span {
		cursor: pointer;
	}
`;

export default function VolunteerComment(user: Iprops) {
	const [edit, setEdit] = useState(false);
	const [updateComment, setUpdateComment] = useState(user.content);

	const handleEditClick = () => {
		setEdit(true);
	};

	const handleCommentUpdate = () => {
		const data = {
			content: updateComment,
		};
		CommentEdit(`reviews/${user.myId}`, data);
		setEdit(false);
		window.location.reload();
	};
	const date = user.time.split(".")[0];
	return (
		<>
			<div className="answer-read-container">
				<StyledProfileImgContainer>
					{user.profileImage ? (
						<img src={user.profileImage} alt="프로필사진" />
					) : (
						<FaUserCircle size={50} />
					)}
				</StyledProfileImgContainer>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginLeft: "20px",
						width: "90%",
					}}
				>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<span style={{ marginRight: "10px" }}>{user.memberName}</span>
							<span style={{ color: "gray" }}>{date}</span>
						</div>
						{user.id === user.myId ? (
							<Comment>
								{edit ? (
									<>
										<span onClick={handleCommentUpdate}>수정완료 |</span>
										<span onClick={() => setEdit(false)}> 취소</span>
									</>
								) : (
									<>
										<span onClick={handleEditClick}>수정 |</span>
										<span onClick={user.onClick}> 삭제</span>
									</>
								)}
							</Comment>
						) : null}
					</div>
					{edit ? (
						<input
							value={updateComment}
							onChange={(e) => setUpdateComment(e.target.value)}
							placeholder="수정글 입력"
						></input>
					) : (
						<span>{user.content}</span>
					)}
				</div>
			</div>
		</>
	);
}
