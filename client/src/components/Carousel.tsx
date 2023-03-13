import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Body = styled.div`
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
	padding-left: 10%;
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
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		// autoplay: true,
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
						<img
							src="https://img.freepik.com/premium-vector/set-of-volunteer-people-illustration_95397-113.jpg?w=2000"
							alt="1"
						></img>
						<span>작은 마음이 모여서 조금 더 나은 내일을 만들어요.</span>
					</Style1>
				</div>
				<div>
					<Style1 color="#898D55">
						<img
							src="https://www.freebie-ac.jp/sozai/2020_168_volunteering_collection/img/main.jpg"
							alt="2"
						></img>
						<span>작은 마음이 모여서 조금 더 나은 내일을 만들어요.</span>
					</Style1>
				</div>
				<div>
					<Style1 color="#767EC6">
						<img
							src="https://mblogthumb-phinf.pstatic.net/MjAxODA0MDlfMTUy/MDAxNTIzMjQwNjYxMDcw.NUntdy9kjN5iiUuneXi71eg74XEAtAJ40QOGb1LhOewg.UyZCO_3r6zQUwbDJ9n5FXuX-yalD0bMAHFiy9v8NN1Mg.PNG.lifesaverclinic/%EC%A7%B1%EA%B5%AC-%EC%BB%B4%ED%93%A8%ED%84%B0-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B46.png?type=w800"
							alt="3"
						></img>
						<span>작은 마음이 모여서 조금 더 나은 내일을 만들어요.</span>
					</Style1>
				</div>
			</Slider>
		</Body>
	);
}
