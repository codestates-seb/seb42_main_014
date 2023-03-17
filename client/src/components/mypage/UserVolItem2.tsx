import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	& > div:first-child {
		width: 140px;
	}
	button {
		color: #ffffff;
		background-color: #000000;
		border-radius: 30px;
		padding: 2px 20px;
	}
`;

export default function UserVolItem2() {
	const onRemove = () => {
		if (window.confirm("이 작업이 수행되면 봉사가 취소됩니다.")) {
			alert("봉사활동이 취소 되었습니다.");
		} else {
			alert("작업을 취소합니다.");
		}
	};
	return (
		<>
			<Container>
				<div>깨끗한 길거리 만들기 </div>
				<div>일자 : 2023-03-09</div>
				<div>
					<button onClick={onRemove}>봉사취소</button>
				</div>
			</Container>
		</>
	);
}
