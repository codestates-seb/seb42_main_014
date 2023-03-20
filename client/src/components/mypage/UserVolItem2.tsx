import styled from "styled-components";
import { Volpatch } from "../../api/mypage/VolunteerFatch";

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

interface ItemProps {
	title: string;
	time: string;
}

export default function UserVolItem2(props: ItemProps) {
	const onRemove = async (event: any) => {
		event.preventDefault();
		if (window.confirm("이 작업이 수행되면 봉사가 취소됩니다.")) {
			try {
				await Volpatch(`apply/3`);
				console.log("헬로우");

				alert("봉사활동이 취소 되었습니다.");
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("작업을 취소합니다.");
		}
	};

	return (
		<>
			<Container>
				<div>{props.title} </div>
				<div>일자 : {props.time}</div>
				<div>
					<button onClick={onRemove}>봉사취소</button>
				</div>
			</Container>
		</>
	);
}
