import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

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
	align-items: flex-end;
	img {
		margin-left: 20px;
		margin-top: 45px;
		margin-bottom: 20px;
		width: 800px;
		height: 500px;
	}
	span {
		color: white;
		margin-left: 20px;
		font-size: 1.6rem;
		margin-bottom: 10px;
		font-weight: 700;
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

export default function Carousel() {
	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 8000,
		cssEase: "linear",
		nextArrow: <NextTo></NextTo>,
		prevArrow: <Pre></Pre>,
	};

	return (
		<Body>
			<Slider {...settings}>
				<div>
					<Style1 color="green">
						<img src="/images/home/main-img-1.png" alt="1"></img>
						<span>작은 마음이 모여서 조금 더 나은 내일을 만들어요.</span>
					</Style1>
				</div>
				<div>
					<Style1 color="#898D55">
						<img src="/images/home/main-img-2.png" alt="2"></img>
						<span>작은 마음이 모여서 조금 더 나은 내일을 만들어요.</span>
					</Style1>
				</div>
				<div>
					<Style1 color="#767EC6">
						<img src="/images/home/main-img-3.png" alt="3"></img>
						<span>작은 마음이 모여서 조금 더 나은 내일을 만들어요.</span>
					</Style1>
				</div>
			</Slider>
		</Body>
	);
}