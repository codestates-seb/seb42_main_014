import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextTruncate from "../TextCut";

const Container = styled.div`
	display: flex;
	align-items: center;
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
	const nav = useNavigate();
	const onRemove = async () => {
		if (window.confirm("이 작업이 수행되면 봉사활동이 취소 됩니다.")) {
			props.deleteItem(props.id);
		}
	};
	const clickHandlr = () => {
		nav(`/volunteer/${props.id}`);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const date = props.time.split("T")[0];
	return (
		<>
			<Container>
				<div onClick={clickHandlr} style={{ cursor: "pointer" }}>
					<TextTruncate text={props.title} limit={10} />
				</div>
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
