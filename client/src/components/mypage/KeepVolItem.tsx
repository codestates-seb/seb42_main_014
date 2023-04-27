import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextTruncate from "../TextCut";

interface KeepVolItemProps {
	title: string;
	name: string;
	id: number;
}

const Container = styled.div`
	display: flex;
	cursor: pointer;
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

export default function KeepVolItem(props: KeepVolItemProps) {
	const nav = useNavigate();
	const clickHandlr = () => {
		nav(`/volunteer/${props.id}`);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<>
			<Container>
				<div onClick={clickHandlr}>
					<TextTruncate text={props.title} limit={10} />
				</div>
				<div>{props.name}</div>
			</Container>
		</>
	);
}
