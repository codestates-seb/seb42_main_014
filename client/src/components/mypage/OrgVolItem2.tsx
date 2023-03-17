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

export default function OrgVolItem1() {
	const onRemove = () => {
		if (window.confirm("이 작업이 수행되면 게시글이 삭제 됩니다.")) {
			alert("삭제되었습니다.");
		} else {
			alert("취소합니다.");
		}
	};
	return (
		<>
			<Container>
				<div>유기견 산책 시키기</div>
				<div>게시일 : 2023-03-07</div>
				<div>
					<button onClick={onRemove}>삭제하기</button>
				</div>
			</Container>
		</>
	);
}
