import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { CommentEdit } from "../../api/volunteer/volunteerCommentEdit ";

interface Iprops {
	content: string;
	memberName: string;
	time: string;
	onClick: any;
	id: any;
	myId: any;
	editComment: (id: any) => void;
}
const Comment = styled.div`
	span {
		cursor: pointer;
	}
`;

export default function VolunteerComment(user: Iprops) {
	const [ment, setMent] = useState("");
	const [edit, setEdit] = useState(false);

	const handleMent = (e: any) => {
		setMent(e.target.value);
		console.log(ment);
	};

	const handleEditClick = () => {
		setEdit(true);
	};

	const handleCommentUpdate = () => {
		const data = {
			content: ment,
		};
		CommentEdit(`reviews/${user.myId}`, data);
		setEdit(false);
	};
	const date = user.time.split(".")[0];
	return (
		<>
			<div className="answer-read-container">
				<FaUserCircle size={40} />
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
						<input value={ment} onChange={handleMent} placeholder="수정글 입력"></input>
					) : (
						<span>{user.content}</span>
					)}
				</div>
			</div>
		</>
	);
}
