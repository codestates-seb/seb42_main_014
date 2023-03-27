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
	id: number;
	deleteItem: (id: number) => void;
}

export default function UserVolItem2(props: ItemProps) {
	const apiUrl = `http://3.35.252.234:8080/apply/`;
	const onRemove = async () => {
		if (window.confirm("이 작업이 수행되면 봉사활동이 취소 됩니다.")) {
			// try {
			// 	const response = await axios.patch(`${apiUrl}${props.id}`, null, {
			// 		headers: {
			// 			Authorization: `${localStorage.getItem("accessToken")}`,
			// 		},
			// 	});
			// 	return response.data.body;
			// } catch (err) {
			// 	alert("봉사 취소에 실패했어요. 잠시 후 다시 시도해 주세요.");
			// }
			props.deleteItem(props.id);
		}
	};
	const date = props.time.split("T")[0];
	return (
		<>
			<Container>
				<div>{props.title} </div>
				<div>일자 : {date}</div>
				<div>
					<button type="button" onClick={onRemove}>
						봉사취소
					</button>
				</div>
			</Container>
		</>
	);
}
