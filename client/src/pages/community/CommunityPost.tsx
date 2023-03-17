import VolunteerTop from "../volunteer/VolunteerPost";
import styled from "styled-components";
import TextEdit from "../../components/volunteer/TextEdit";

const Bar = styled.div`
	margin-top: 20px;
	line-height: 50px;
	margin-bottom: 30px;
	color: white;
	background-color: #000000;
	width: 100%;
	height: 50px;
	text-align: center;
	font-size: 20px;
	font-weight: bold;
`;
const Btn = styled.div`
	cursor: pointer;
	font-size: 20px;
	background-color: #a50000;
	color: white;
	text-align: center;
	height: 50px;
	line-height: 50px;
	margin-bottom: 120px;
`;
const Content = styled.div`
	border-top: 3px solid black;
	width: 50%;
	min-width: 970px;
	display: flex;
	flex-direction: column;
`;
const Body = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export default function VolunteerPost() {
	return (
		<Body>
			<VolunteerTop />
			<Content>
				<Bar>그 룹 소 개</Bar>
				<TextEdit />
				<Btn>등 록 완 료</Btn>
			</Content>
		</Body>
	);
}
