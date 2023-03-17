import { FaArrowLeft, FaEnvira } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdGroup, MdOutlinePersonPin } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function GroupInfo() {
	const StyledContainerDiv = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 800px;
		width: 100%;
		section {
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
			width: 50%;
			margin: 10px;
			min-width: 800px;
		}
		h1 {
			text-align: center;
		}
		img {
			width: 400px;
			height: 300px;
			border-radius: 10px;
		}
		.layout {
			display: flex;
			align-items: center;
			span {
				margin-left: 10px;
			}
			margin-bottom: 5px;
		}
	`;
	return (
		<StyledContainerDiv>
			<Link to={"/community"}>
				<div style={{ width: "50%", margin: "10px", cursor: "pointer", minWidth: "800px" }}>
					<FaArrowLeft size={40} />
				</div>
			</Link>
			<section>
				<h1>유기견 팀</h1>
			</section>
			<section style={{ display: "flex", padding: "20px" }}>
				<img src="/images/home/main-img-2.png" alt="그룹 사진" />
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<div style={{ marginLeft: "20px" }}>
						<div className="layout">
							<MdGroup size={30} />
							<span>그룹 소개</span>
						</div>
						<div>
							안녕하세요 저희는 매주 주말 유기견 봉사를 하는 유기견 팀입니다. 저희와 함께 하실분
							연락주세요.
						</div>
					</div>
					<div style={{ margin: "20px 0px 0px 20px" }}>
						<div className="layout">
							<MdOutlinePersonPin size={30} />
							<span>모집 인원</span>
						</div>
						<div>8명</div>
					</div>
					<div style={{ margin: "20px" }}>
						<div className="layout">
							<FiMapPin size={30} />
							<span>활동 지역</span>
						</div>
						<div>서울시 광진구</div>
					</div>
					<div style={{ marginLeft: "20px" }}>
						<FaEnvira size={30} />
					</div>
				</div>
			</section>
		</StyledContainerDiv>
	);
}
