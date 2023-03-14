import styled from "styled-components";

const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	width: 100%;
	box-shadow: 0px 0px 10px 1px #dbdbdb;
	border-radius: 10px;
	padding: 20px 40px;
	margin-bottom: 30px;
	justify-content: space-between;
	& > div {
		/* ImgDiv, InfoDiv 공통 */
		display: flex;
		flex-direction: column;
	}
`;
const ImgDiv = styled.div`
	align-items: center;

	button {
		color: #ffffff;
		background-color: #000000;
		border-radius: 30px;
		padding: 5px 30px;
	}

	img {
		width: 64px;
	}
`;
const MedalSpan = styled.span`
	position: absolute;
	width: 90px;
	height: 64px;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;

	img {
		width: 32px;
		height: 32px;
	}
`;

const InfoDiv = styled.div`
	justify-content: center;
	& > div {
		font-size: 1.2rem;
	}
`;

export default function Usercard() {
	return (
		<>
			<Container>
				<ImgDiv>
					{/* 프로필이미지와 수정버튼 */}
					<div>
						{/* 프로필이미지 */}
						<img src="/images/mypage/user.png" alt="프로필이미지" />
					</div>
					<button>수정하기</button>
				</ImgDiv>
				<MedalSpan>
					<img src="/images/mypage/medal.png" alt="봉사 뱃지" />
				</MedalSpan>
				<InfoDiv>
					{/* 프로필 정보 */}
					<div>이름 : 김코딩</div>
					<div>이메일 : abcdef@gmail.com</div>
					<div>봉사점수 : 1000점</div>
				</InfoDiv>
			</Container>
		</>
	);
}
