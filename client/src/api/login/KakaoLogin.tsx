import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { REDIRECT_URI, REST_API_KEY } from "../../data/KakaoLoginData";

export default function KakaoLogin() {
	const location = useLocation();
	const navigate = useNavigate();
	const code = location.search.split("=")[1];

	const IP = "3.35.252.234:8080";

	// TODO 다시 해보는 중
	// 카카오 계정 로그인 후.
	// 인가 코드 획득.
	// useEffect(() => {
	// 	if (code) {
	// 		localStorage.setItem("code", code);
	// 	}
	// }, []);

	const getKakaoToken = () => {
		fetch("https://kauth.kakao.com/oauth/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.access_token) {
					localStorage.setItem("kakaoToken", data.access_token);
				} else {
					navigate("/login");
					window.alert("로그인에 실패하였습니다.");
				}
			});
	};

	useEffect(() => {
		if (!location.search) return;
		getKakaoToken();
	}, []);

	useEffect(() => {
		// axios({
		// 	method: "OPTIONS",
		// 	url: `http://${IP}/oauth2/authorization/kakao?code=${code}`,
		// });

		axios({
			method: "GET",
			// url: `http://${IP}/login/oauth2/code/kakao?code=${code}`,
			url: `http://login/oauth2/code/kakao${IP}`,
		}).then((res) => {
			console.log(res); // 토큰이 넘어온다.
			const ACCESS_TOKEN = res.data.accessToken;
			localStorage.setItem("token", ACCESS_TOKEN); // 토큰을 로컬에 저장한다.
			navigate("/"); // 토큰을 받았고, 로그인이 되면 홈화면으로 이동한다.
		});

		// fetch(`http://${IP}/oauth2/authorization/kakao?code=${code}`, {
		// 	method: "GET",
		// })
		// 	.then((res: Response) => res.json())
		// 	.then((data) => {
		// 		localStorage.setItem("token", data.token);
		// 		navigate("/");
		// 	});
	}, []);

	return <div>KakaoLogin</div>;
}
