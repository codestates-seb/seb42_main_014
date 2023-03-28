import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextTruncate from "../TextCut";

interface ItemProps {
	title: string;
	time: string;
	id: number;
}

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

export default function UserVolItem1(props: ItemProps) {
	const nav = useNavigate();
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
				<div>일자 : {date} </div>
				<div>
					<button onClick={clickHandlr}>후기작성</button>
				</div>
			</Container>
		</>
	);
}
