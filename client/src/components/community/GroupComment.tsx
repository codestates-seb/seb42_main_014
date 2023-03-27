import { useState } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { CommentEdit } from "../../api/volunteer/volunteerCommentEdit ";
import dayjs from "dayjs";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useParams } from "react-router-dom";

interface Props {
	content: string;
	commentId: any;
	onClick: any;
	id: any;
	myId: any;
	name: string;
	time: string;
	profileImage: string;
	setReviewList: React.Dispatch<React.SetStateAction<any[]>>;
}
const Comment = styled.div`
	span {
		cursor: pointer;
	}
`;
export const StyledProfileImgContainer = styled.div`
	display: flex;
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
`;

export default function GroupComment(user: Props) {
	const [ment, setMent] = useState(user.content);
	const [edit, setEdit] = useState(false);
	const params = useParams();
	const handleEditClick = () => {
		setEdit(true);
	};
	const handleCommentUpdate = async () => {
		const data = {
			content: ment,
		};
		await CommentEdit(`comments/${user.commentId}`, data);
		const newCommentList = await myPageGet(`comments/group/${params.id}`);
		user.setReviewList(newCommentList.data);
		setEdit(false);
	};
	const date = dayjs(user.time).format("YYYY-MM-DD HH:mm");

	return (
		<section>
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
						<input
							value={ment}
							onChange={(e) => setMent(e.target.value)}
							placeholder="수정글 입력"
						></input>
					) : (
						<span>{user.content}</span>
					)}
				</div>
			</div>
		</section>
	);
}
