import { FaUserCircle } from "react-icons/fa";
import GroupComment from "./GroupComment";
import styled from "styled-components";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { myPageGet } from "../../api/mypage/MypageGet";
import { volunteerCommentPost } from "../../api/volunteer/volunteerData";

const StyledContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	min-width: 500px;

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
		border: 1px solid gray;
		width: 90%;
		border-radius: 20px;
		padding: 5px 20px 5px 20px;
		margin: 20px;
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
export default function Comment() {
	const parms = useParams();

	const [reviewList, setReviewList] = useState([]);
	const [ment, setMent] = useState("");

	const handleMent = (e: any) => {
		setMent(e.target.value);
		console.log(ment);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet(`comments/group/${parms.id}`);

			setReviewList(result.data);
		};
		fetchData();
	}, [parms.id]);

	const handleCommentPost = () => {
		const data = {
			groupId: parms.id,
			content: ment,
		};

		volunteerCommentPost("comments", data);
		window.location.reload();
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
				{reviewList.map((user) => (
					<GroupComment key={user.id} content={user.content} />
				))}
			</StyledContainerDiv>
		</div>
	);
}
