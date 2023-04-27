import styled from "styled-components";

interface Iprops {
	name: string;
	emali: string;
}
const Container = styled.div`
	text-align: left;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	width: 100%;
	box-shadow: 0px 0px 10px 1px #dbdbdb;

	padding: 20px 10px;
	margin-bottom: 5px;
	margin-right: 10px;
`;

export default function User(props: Iprops) {
	return (
		<>
			<Container>
				<span> UserName: {props.emali} </span>
				<span> UserEmali: {props.name}</span>
			</Container>
		</>
	);
}
