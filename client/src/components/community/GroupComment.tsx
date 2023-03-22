import { useState } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { CommentEdit } from "../../api/volunteer/volunteerCommentEdit ";

interface Props {
	content: string;
	commentId: any;
	onClick: any;
	id: any;
	myId: any;
	name: string;
	time: string;
}
const Comment = styled.div`
	span {
		cursor: pointer;
	}
`;

export default function GroupComment(user: Props) {
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
		CommentEdit(`comments/${user.commentId}`, data);
		setEdit(false);
	};
	const date = user.time.split(".")[0];
	return (
		<section>
			<div className="answer-read-container">
				<FaUserCircle size={40} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginLeft: "20px",
						width: "100%",
					}}
				>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<span style={{ marginRight: "10px" }}>{user.name}</span>
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
		</section>
	);
}
