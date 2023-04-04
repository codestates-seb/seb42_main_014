import styled from "styled-components";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { BsLink45Deg } from "react-icons/bs";
import { myPageGet } from "../../api/mypage/MypageGet";

const StyledContainerDiv = styled.div`
	width: 100%;
	align-items: center;
	justify-content: center;
	margin: 20px;
	display: flex;
	flex-direction: column;
	min-width: 1035px;

	img {
		border-radius: 10px;
		margin: 20px;
	}

	div > span {
		margin-bottom: 20px;
		font-size: 16px;
	}

	button {
		background-color: white;
		border: 1px solid gray;
		cursor: pointer;
	}

	.button-container {
		display: flex;
		width: 290px;
		border: 1px solid gray;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
`;
const StyledEmptyLineDiv = styled.div`
	width: 100%;
	background-color: black;
	height: 50px;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 1035px;
`;

export default function VolunteerInfo() {
	// 제목
	const [title, setTitle] = useState("");

	// 이미지
	const [volunteerImage, setVolunteerImage] = useState(null);

	// 모집 시작 날짜
	const [applyDate, setApplyDate] = useState("");

	// 봉사일
	const [volunteerDate, setVolunteerDate] = useState("");

	// 봉사 시간
	const [volunteerTime, setVolunteerTime] = useState(0);

	// 봉사 장소
	const [place, setPlace] = useState("");

	// 모집 인원
	const [applyLimit, setApplyLimit] = useState(0);

	// 신청 인원
	const [applyCount, setApplyCount] = useState(0);

	// 활동 정보
	const [content, setContent] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet("volunteers/2");
			// console.log(result.volunteer);
			setTitle(result.volunteer.title);
			setVolunteerImage(result.volunteer.image);
			setApplyDate(result.volunteer.applyDate);
			setVolunteerDate(result.volunteer.volunteerDate);
			setVolunteerTime(result.volunteer.volunteerTime);
			setApplyLimit(result.volunteer.applyLimit);
			setApplyCount(result.volunteer.applyCount);
			setPlace(result.volunteer.place);
			setContent(result.volunteer.content);
		};
		fetchData();
	}, []);

	const [isLike, setIsLike] = useState(false);

	const handleCopyClipBoard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			alert("클립보드에 링크가 복사되었어요.");
		} catch (err) {
			console.log(err);
			alert("복사에 실패했어요. 잠시 후 다시 시도해 주세요.");
		}
	};

	const baseUrl = `http://main014-bucket.s3-website.ap-northeast-2.amazonaws.com`;

	return (
		<StyledContainerDiv>
			<section
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img
					src={volunteerImage}
					style={{ width: "500px", height: "400px" }}
					alt="봉사 타이틀 사진"
				/>
				<div style={{ display: "flex", flexDirection: "column", marginLeft: "40px" }}>
					<h2>{title}</h2>
					<span>
						모집 기간 : {applyDate.slice(0, 10)} ~ {volunteerDate.slice(0, 10)}
					</span>
					<span>봉사 장소 : {place}</span>
					<span>봉사 시간 : {volunteerTime}시간</span>
					<span>
						모집 인원 : {applyCount} / {applyLimit}
					</span>
					<Button
						// onClick={() => volunteerDetailPost()}
						value="나도 할래!"
						width={350}
						height={50}
						radius={0}
						bgColor="#b30f0fb9"
						textSize={15}
					/>
					<div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
						<button onClick={() => setIsLike(!isLike)}>
							{!isLike ? <FcLikePlaceholder size={40} /> : <FcLike size={40} />}
						</button>
						<div
							className="button-container"
							// onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)}
						>
							<Button
								value={"너도 할래?"}
								width={200}
								height={50}
								bgColor="white"
								textColor="black"
								textSize={15}
							/>
							<BsLink45Deg size={30} style={{ borderLeft: "1px solid gray", width: "200px" }} />
						</div>
					</div>
				</div>
			</section>
			<StyledEmptyLineDiv>활동 정보</StyledEmptyLineDiv>
			<div style={{ height: "400px", margin: "20px" }}>
				<span style={{ fontSize: "18px" }}>{content}</span>
			</div>
			<StyledEmptyLineDiv>봉사 후기</StyledEmptyLineDiv>
		</StyledContainerDiv>
	);
}
