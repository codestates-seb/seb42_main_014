import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Lottie from "lottie-react";
import testLottie from "../lottie.json";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";

const Body = styled.div`
	.slick-dots {
		position: relative;
		bottom: 0;
	}
	.slick-prev:before,
	.slick-next:before {
		font-size: 50px;
		line-height: 1;
		opacity: 1;
		color: #000000;
		-webkit-font-smoothing: antialiased;
	}
`;
const Style1 = styled.div`
	justify-content: center;
	background-color: ${(props) => props.color};
	display: flex;
	align-items: center;
	padding: 20px;
	width: 100%;
	img {
		width: 23%;
	}
	.title {
		font-size: 30px;
		font-weight: 900;
	}
`;
const Style2 = styled.div`
	justify-content: center;
	background-color: ${(props) => props.color};
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	.title {
		font-size: 30px;
		font-weight: 900;
		margin-bottom: 15px;
	}
`;

const Pre = styled.div`
	width: 50px;
	height: 50px;
	position: absolute;
	left: 2%;
	z-index: 3;
`;

const NextTo = styled.div`
	width: 50px;
	height: 50px;
	position: absolute;
	right: 2%;
	z-index: 3;
`;
const settings = {
	dots: true,
	fade: true,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 500,
	autoplaySpeed: 3000,
	cssEase: "linear",
	nextArrow: <NextTo></NextTo>,
	prevArrow: <Pre></Pre>,
};

const MoveToTestButton = styled.button`
	background-color: ${theme.primary};
	border: none;
	width: 250px;
	height: 50px;
	border-radius: 10px;
	color: white;
	font-size: 17px;
	font-weight: 900;
	cursor: pointer;
	margin-top: 20px;
`;

export default function Carousel() {
	const navigate = useNavigate();
	return (
		<Body>
			<Slider {...settings}>
				<div>
					<Style2 color="white">
						<Lottie animationData={testLottie} />
						<div>
							<div className="title">봉사 자동매칭 서비스</div>
							<div>
								간단한 테스트로 내 봉사 성향을 알아보고,
								<br /> 자동으로 그에 맞는 봉사만 추천받을 수 있어요.
							</div>
							<MoveToTestButton onClick={() => navigate("/test")}>테스트 하러가기</MoveToTestButton>
						</div>
					</Style2>
				</div>
			</Slider>
		</Body>
	);
}
