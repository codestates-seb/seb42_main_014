import { useEffect } from "react";

export const KakaoShareButton = ({ getVolunteerInfoData }) => {
	useEffect(() => {
		const { title, volunteerImage, volunteerId } = getVolunteerInfoData;

		const createKakaoButton = () => {
			if (window.Kakao) {
				const kakao = window.Kakao;
				if (!kakao.isInitialized()) {
					kakao.init("9efb2f5feb72e551ae1d71ef75b35ad3");
				}
				kakao.Share.createDefaultButton({
					container: "#kakaotalk-sharing-btn",
					objectType: "feed",
					content: {
						title,
						imageUrl: volunteerImage,
						description: "봉사 같이 할래? 좀나세에서 다양한 봉사를 신청해보세요.",
						link: {
							webUrl: `http://main014-bucket.s3-website.ap-northeast-2.amazonaws.com/volunteer/${volunteerId}`,
						},
					},
					buttons: [
						{
							title: "웹으로 보기",
							link: {
								webUrl: `http://main014-bucket.s3-website.ap-northeast-2.amazonaws.com/volunteer/${volunteerId}`,
							},
						},
					],
				});
			}
		};
		createKakaoButton();
	}, []);
	return (
		<a id="kakaotalk-sharing-btn" href="javascript:;">
			<img
				src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
				alt="카카오톡 공유 보내기 버튼"
			/>
		</a>
	);
};
