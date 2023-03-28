import styled from "styled-components";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useLocation, useParams } from "react-router-dom";
import { BsLink45Deg } from "react-icons/bs";
import { myPageGet } from "../../api/mypage/MypageGet";
import axios from "axios";
import dayjs from "dayjs";

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
		margin-bottom: 10px;
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
	const location = useLocation();
	const params = useParams();
	const [getVolunteerInfoData, setGetVolunteerInfoData] = useState<any>({});
	const [isLike, setIsLike] = useState(false);
	const baseUrl = `http://main014-bucket.s3-website.ap-northeast-2.amazonaws.com`;

	useEffect(() => {
		const id = localStorage.getItem(`${params.id}`);
		if (id) {
			setIsLike(JSON.parse(id));
		}
	}, [params.id]);

	const heartHandler = async () => {
		try {
			if (isLike === false) {
				await axios.post(`http://3.35.252.234:8080/likes/${params.id}`, null, {
					headers: {
						Authorization: `${localStorage.getItem("accessToken")}`,
					},
				});
			} else if (isLike === true) {
				await axios.delete(`http://3.35.252.234:8080/likes/${params.id}`, {
					headers: {
						Authorization: `${localStorage.getItem("accessToken")}`,
					},
				});
			}
			setIsLike((prev) => !prev);
			localStorage.setItem(`${params.id}`, JSON.stringify(!isLike));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await myPageGet(`volunteers/${params.id}`).then((res) =>
				setGetVolunteerInfoData(res.volunteer),
			);
		};
		fetchData();
	}, [params.id]);

	const {
		title,
		volunteerImage,
		applyDate,
		volunteerDate,
		volunteerTime,
		applyLimit,
		applyCount,
		place,
		content,
		organizationName,
	} = getVolunteerInfoData;
	const handlePost = async () => {
		try {
			await axios.post(`http://3.35.252.234:8080/apply/${params.id}`, null, {
				headers: {
					Authorization: `${localStorage.getItem("accessToken")}`,
				},
			});
			alert("봉사가 신청되었어요 :)");
			await myPageGet(`volunteers/${params.id}`).then((res) =>
				setGetVolunteerInfoData(res.volunteer),
			);
		} catch (err) {
			alert("이미 신청하셨어요! :(");
		}
	};
	const handleCopyClipBoard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			alert("클립보드에 링크가 복사되었어요.");
		} catch (err) {
			alert("복사에 실패했어요. 잠시 후 다시 시도해 주세요.");
		}
	};

	const startDate = dayjs(applyDate).format("YYYY-MM-DD");
	const endDate = dayjs(volunteerDate).subtract(1, "day").format("YYYY-MM-DD");
	const volunDate = dayjs(volunteerDate).format("YYYY-MM-DD");

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
					<span>기관명 : {organizationName}</span>
					<span>
						모집 기간 : {startDate} ~ {endDate}
					</span>
					<span>봉사 일자 : {volunDate}</span>
					<span>봉사 장소 : {place}</span>
					<span>봉사 시간 : {volunteerTime}시간</span>
					<span>
						모집 인원 : {applyCount} / {applyLimit}
					</span>
					<Button onClick={handlePost} value="나도 할래!" width={350} height={50} textSize={15} />
					<div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
						<button onClick={heartHandler}>
							{!isLike ? <FcLikePlaceholder size={40} /> : <FcLike size={40} />}
						</button>
						<div
							className="button-container"
							onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)}
						>
							<Button
								value={"너도 할래?"}
								width={200}
								height={50}
								textColor="black"
								textSize={15}
								bgColor={"white"}
							/>
							<BsLink45Deg size={30} style={{ borderLeft: "1px solid gray", width: "200px" }} />
						</div>
					</div>
				</div>
			</section>
			<StyledEmptyLineDiv>활동 정보</StyledEmptyLineDiv>
			<div style={{ height: "400px", margin: "20px" }}>
				<div dangerouslySetInnerHTML={{ __html: content }} style={{ fontSize: "18px" }} />
			</div>
			<StyledEmptyLineDiv>봉사 후기</StyledEmptyLineDiv>
		</StyledContainerDiv>
	);
}
