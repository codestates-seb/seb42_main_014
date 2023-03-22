import { useNavigate } from "react-router";
import styled from "styled-components";

interface KeepVolItemProps {
	title: string;
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

export default function GroupItem(props: KeepVolItemProps) {
	const nav = useNavigate();
	const clickHandlr = () => {
		nav(`/community/${props.id}`);
	};
	return (
		<>
			<Container>
				<div>{props.title} </div>
				<div>
					<button onClick={clickHandlr}>내 그룹 가기</button>
				</div>
			</Container>
		</>
	);
}
