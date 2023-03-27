import { FaUserCircle } from "react-icons/fa";
import GroupComment from "./GroupComment";
import styled from "styled-components";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { myPageGet } from "../../api/mypage/MypageGet";
import { volunteerCommentPost } from "../../api/volunteer/volunteerData";
import { CommentDelete } from "../../api/volunteer/volunteerComment";

const StyledContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	min-width: 500px;
	height: fit-content;
	section {
		margin: 10px;
		width: 100%;
		min-width: 500px;
	}
	.layout {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 500px;
	}
	input {
		width: 60%;
		height: 40px;
		border: 1px solid gray;
		border-radius: 20px;
		margin: 20px;
		padding: 20px;
	}
	.answer-read-container {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid gray;
		border-radius: 20px;
		padding: 5px 20px 5px 20px;
		margin: 5px 15px 5px 15px;
		min-width: 400px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.11);
	}
`;
const StyledInputContainerDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid gray;
	width: 100%;
	margin: 20px;
`;
const ReviewList = styled.div`
	height: 500px;
	overflow: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
export default function Comment() {
	const parms = useParams();
	const [my, setMy] = useState("");

	const [reviewList, setReviewList] = useState([]);
	const [ment, setMent] = useState("");

	const handleMent = (e: any) => {
		setMent(e.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet(`comments/group/${parms.id}`);
			const myCommnet = await myPageGet(`members/me`);
			setReviewList(result.data);
			setMy(myCommnet.data.memberId);
		};
		fetchData();
	}, [parms.id]);

	const handleCommentPost = async (event: any) => {
		event.preventDefault();
		const data = {
			groupId: parms.id,
			content: ment,
		};
		await volunteerCommentPost("comments", data);
		// await myPageGet(`comments/group/${parms.id}`);
		window.location.reload();
	};
	const onRemove = async (commentId: string) => {
		if (window.confirm("이 댓글을 삭제 하시겠습니까?")) {
			CommentDelete(`comments/${commentId}`);
			window.location.reload();
			// myPageGet(`comments/group/${parms.id}`);
		} else {
			alert("취소합니다.");
		}
	};

	return (
		<div>
			<StyledContainerDiv>
				<StyledInputContainerDiv>
					<FaUserCircle size={40} />
					<input placeholder="자유롭게 댓글을 남겨보세요!" value={ment} onChange={handleMent} />
					<Button
						onClick={handleCommentPost}
						value="등록"
						width={55}
						height={40}
						radius={10}
						textSize={14}
						bgColor="black"
					/>
				</StyledInputContainerDiv>
				<ReviewList>
					{reviewList.map((user) => (
						<GroupComment
							key={user.id}
							id={user.memberId}
							name={user.memberName}
							time={user.createdAt}
							commentId={user.commentId}
							content={user.content}
							onClick={() => onRemove(user.commentId)}
							myId={my}
							profileImage={user.profileImage}
						/>
					))}
				</ReviewList>
			</StyledContainerDiv>
		</div>
	);
}
