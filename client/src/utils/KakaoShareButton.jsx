import { useEffect, useState } from "react";
import styled from "styled-components";

const KakaoButton = styled.div`
	img {
		width: 45px;
		margin-right: 10px;
	}
	width: 310px;
	background-color: #fae100;
	margin-right: 5px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 5px;
	font-weight: 900;
	height: 50px;
`;

export const KakaoShareButton = ({ getVolunteerInfoData }) => {
	const { title, volunteerImage, volunteerId } = getVolunteerInfoData;
	useEffect(() => {
		const createKakaoButton = () => {
			if (window.Kakao) {
				const kakao = window.Kakao;
				if (!kakao.isInitialized()) {
					kakao.init(process.env.REACT_APP_KAKAO_SHARE_KEY);
				}
				// kakao.Share.createDefaultButton({
				// 	container: "#kakaotalk-sharing-btn",
				// 	objectType: "feed",
				// 	content: {
				// 		title: title,
				// 		description: "봉사 같이 할래? 좀나세에서 다양한 봉사를 신청해보세요.",
				// 		imageUrl: volunteerImage,
				// 		link: {
				// 			// webUrl: `http://main014-bucket.s3-website.ap-northeast-2.amazonaws.com`,
				// 			webUrl: `http://localhost:3000`,
				// 		},
				// 	},
				// 	buttons: [
				// 		{
				// 			title: "웹으로 보기",
				// 			link: {
				// 				webUrl: `http://main014-bucket.s3-website.ap-northeast-2.amazonaws.com/volunteer/${volunteerId}`,
				// 			},
				// 		},
				// 	],
				// });
				kakao.Share.createScrapButton({
					container: "#kakaotalk-sharing-btn",
					requestUrl: `http://main014-bucket.s3-website.ap-northeast-2.amazonaws.com/volunteer/${volunteerId}`,
				});
			}
		};
		createKakaoButton();
	}, []);
	return (
		<a id="kakaotalk-sharing-btn" href="javascript:;">
			<KakaoButton>
				<img
					src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
					alt="카카오톡 공유 보내기 버튼"
				/>
				너도 할래? 친구에게 공유하기
			</KakaoButton>
		</a>
	);
};
