import styled from "styled-components";

interface ItemProps {
	title: string;
	time: string;
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
	return (
		<>
			<Container>
				<div>{props.title}</div>
				<div>일자 : {props.time} </div>
				<div>
					<button>후기작성</button>
				</div>
			</Container>
		</>
	);
}
