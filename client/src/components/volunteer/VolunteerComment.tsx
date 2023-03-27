import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../Button";
import ReviewItem from "./ReviewItem";
import { myPageGet } from "../../api/mypage/MypageGet";
import { useParams } from "react-router-dom";
import { volunteerCommentPost } from "../../api/volunteer/volunteerData";
import { CommentDelete } from "../../api/volunteer/volunteerComment";
import dayjs from "dayjs";
import React from "react";

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

const FilterContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	input {
		margin-right: 10px;
	}
	min-width: 1000px;
`;

export const VolunteerCommentContext = React.createContext<{ refreshReviews?: Function }>({});

export default function VolunteerComment(disabled: any) {
	const params = useParams();
	const [volunteerId, setVolunteerId] = useState(params.id);
	const [reviewList, setReviewList] = useState([]);
	const [comment, setComment] = useState("");
	const [myReviewId, setMyReviewId] = useState("");
	const [ment, setMent] = useState("");
	const [isFilteredReviewChecked, setIsFilteredReviewChecked] = useState("allReview");
	console.log("마이리뷰아이디", myReviewId, reviewList);
	const handleComment = (e: any) => {
		setComment(e.target.value);
	};

	const fetchData = async () => {
		const result = await myPageGet(`reviews/${volunteerId}`);
		const myComment = await myPageGet(`reviews/my/${volunteerId}`);
		setReviewList(result.data);
		setMyReviewId(myComment.data.reviewId);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet(`reviews/${params.id}`);
			const myComment = await myPageGet(`reviews/my/${params.id}`);
			setReviewList(result.data);
			setMyReviewId(myComment.data.reviewId);
		};
		fetchData();
	}, [params.id]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet(`volunteers/${params.id}`);
			setMent(result.volunteer.volunteerStatus);
		};
		fetchData();
	}, [params.id]);

	const handleCommentPost = async () => {
		const data = {
			content: comment,
		};
		// if (reviewList.map((el) => el.reviewId === myReviewId)) {
		// 	alert("이미 후기를 등록하셨어요. 후기는 한번만 등록 가능해요.");
		// } else {
		await volunteerCommentPost(`reviews/${params.id}`, data);
		const newReviewList = await myPageGet(`reviews/${params.id}`);
		setReviewList(newReviewList.data);
		const newMyReviewId = await myPageGet(`reviews/my/${params.id}`);
		setMyReviewId(newMyReviewId.data.reviewId);
		setComment("");
	};
	const onRemove = async () => {
		if (window.confirm("이 후기를 삭제 하시겠습니까?")) {
			const res = await CommentDelete(`reviews/${myReviewId}`);
			myPageGet(`reviews/${params.id}`).then((res) => setReviewList(res.data));
		}
	};

	const handleMyReviewClick = () => {
		setIsFilteredReviewChecked("myReview");
		setReviewList(reviewList.filter((el) => el.reviewId === myReviewId));
	};

	const handleAllReviewClick = () => {
		setIsFilteredReviewChecked("allReview");
		myPageGet(`reviews/${params.id}`).then((res) => setReviewList(res.data));
	};

	return (
		<VolunteerCommentContext.Provider value={{ refreshReviews: fetchData }}>
			<FilterContainer>
				<input
					type="radio"
					id="allReview"
					value={"allReview"}
					name="Review"
					onClick={handleAllReviewClick}
					checked={isFilteredReviewChecked === "allReview"}
				/>
				<label htmlFor="allReview" style={{ marginRight: "10px" }}>
					모든 후기 조회
				</label>
				<input
					type="radio"
					id="myReview"
					value={"myReview"}
					name="Review"
					onClick={handleMyReviewClick}
					checked={isFilteredReviewChecked === "myReview"}
				/>
				<label htmlFor="myReview">내가 작성한 후기 조회</label>
			</FilterContainer>
			<StyledContainerDiv>
				<Comment>
					<div className="answer-input-container">
						<FaUserCircle size={40} />
						<input
							placeholder="봉사 후기는 봉사활동이 끝난 뒤 한번만 등록이 가능해요."
							value={comment}
							onChange={handleComment}
						/>
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
				{reviewList.map((user) => {
					const commentCreatedAt = dayjs(user.modifiedAt).format("YYYY-MM-DD HH:mm");
					return (
						<ReviewItem
							key={user.id}
							id={user.reviewId}
							time={commentCreatedAt}
							content={user.content}
							memberName={user.memberName}
							onClick={onRemove}
							myId={myReviewId}
							editComment={function (id: any): void {
								throw new Error("Function not implemented.");
							}}
							profileImage={user.profileImage}
						/>
					);
				})}
			</StyledContainerDiv>
		</VolunteerCommentContext.Provider>
	);
}
