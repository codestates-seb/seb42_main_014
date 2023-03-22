import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../Button";
import CommentList from "./CommentList";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useParams } from "react-router-dom";
import { volunteerCommentPost } from "../../api/volunteer/volunteerData";
import { CommentDelete } from "../../api/volunteer/volunteerComment";

const StyledContainerDiv = styled.div`
	width: 100%;
	height: auto;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	min-width: 1035px;
	margin-top: 30px;

	.answer-input-container {
		display: flex;
		align-items: center;
		width: 100%;
		height: 60px;
		border-radius: 20px;
		justify-content: center;
		min-width: 900px;
	}
	input {
		width: 100%;
		height: 40px;
		border: 2px solid gray;
		border-radius: 20px;
		margin: 20px;
		padding: 20px;
		min-width: 500px;
	}

	.answer-read-container {
		display: flex;
		align-items: center;
		border: 1px solid gray;
		width: 90%;
		border-radius: 20px;
		padding: 20px;
		margin: 20px;
		min-width: 1000px;
	}
`;
const Comment = styled.div`
	width: 90%;
	margin-top: 15px;
`;
export default function VolunteerComment() {
	const parms = useParams();

	const [reviewList, setReviewList] = useState([]);
	const [ment, setMent] = useState("");
	const [my, setMy] = useState("");

	const handleMent = (e: any) => {
		setMent(e.target.value);
		console.log(ment);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet(`reviews/${parms.id}`);
			const myCommnet = await myPageGet(`reviews/my/${parms.id}`);

			setReviewList(result.data);
			setMy(myCommnet.data.reviewId);
		};
		fetchData();
	}, [parms.id]);

	const handleCommentPost = () => {
		const data = {
			content: ment,
		};
		volunteerCommentPost(`reviews/${parms.id}`, data);
		window.location.reload();
	};
	const onRemove = async () => {
		if (window.confirm("이 후기를 삭제 하시겠습니까?")) {
			CommentDelete(`reviews/${my}`);
		} else {
			alert("취소합니다.");
		}
	};

	return (
		<StyledContainerDiv>
			<Comment>
				<div className="answer-input-container">
					<FaUserCircle size={40} />
					<input placeholder="봉사 후기를 남겨주세요." value={ment} onChange={handleMent} />
					<Button
						onClick={handleCommentPost}
						value="등록하기"
						width={90}
						height={40}
						radius={10}
						textSize={14}
						bgColor="black"
						iconName={<AiOutlinePlus style={{ marginLeft: "10px" }} />}
					/>
				</div>
			</Comment>
			{reviewList.map((user) => (
				<CommentList
					key={user.id}
					id={user.reviewId}
					time={user.modifiedAt}
					content={user.content}
					memberName={user.memberName}
					onClick={onRemove}
					myId={my}
					editComment={function (id: any): void {
						throw new Error("Function not implemented.");
					}}
				/>
			))}
		</StyledContainerDiv>
	);
}
