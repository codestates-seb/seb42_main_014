import axios from "axios";
import styled from "styled-components";
import { Volpatch } from "../../api/mypage/VolunteerPatch";

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
	const apiUrl = `http://3.35.252.234:8080/apply/`;
	const id = 26;
	const onRemove = async () => {
		if (window.confirm("이 작업이 수행되면 봉사활동이 취소 됩니다.")) {
			try {
				const response = await axios.patch(`${apiUrl}${id}`, null, {
					headers: {
						Authorization: `${localStorage.getItem("accessToken")}`,
					},
				});
				return response.data.body;
			} catch (err) {
				console.error(err);
			}
		} else {
			alert("취소합니다.");
		}
		// event.preventDefault();
		// if (window.confirm("이 작업이 수행되면 봉사가 취소됩니다.")) {
		// 	try {
		// 		await Volpatch(`apply/3`);
		// 		console.log("헬로우");

		// 		alert("봉사활동이 취소 되었습니다.");
		// 	} catch (error) {
		// 		console.error(error);
		// 	}
		// } else {
		// 	alert("작업을 취소합니다.");
		// }
	};

	return (
		<>
			<Container>
				<div>{props.title} </div>
				<div>일자 : {props.time}</div>
				<div>
					<button type="button" onClick={onRemove}>
						봉사취소
					</button>
				</div>
			</Container>
		</>
	);
}
