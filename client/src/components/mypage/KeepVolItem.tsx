import styled from "styled-components";

interface KeepVolItemProps {
	title: string;
	name: string;
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

export default function KeepVolItem(props: KeepVolItemProps) {
	return (
		<>
			<Container>
				<div>{props.title} </div>
				<div>{props.name}</div>
			</Container>
		</>
	);
}
