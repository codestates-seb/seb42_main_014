import styled from "styled-components";
import Usercard from "../components/mypage/Usercard";
import UserVolList from "../components/mypage/UserVolList";
import KeepVolList from "../components/mypage/KeepVolList";
import GroupList from "../components/mypage/GroupLIst";
import OrgCard from "../components/mypage/OrgCard";
import OrgVolList1 from "../components/mypage/OrgVolList1";
import OrgVolList2 from "../components/mypage/OrgVolList2";
import UnregisterButton from "../components/mypage/UnregisterButton";

const Body = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	/* align-items: center; */
`;

const Container = styled.div`
	top: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& > h1 {
		font-size: 3rem;
	}
	margin-top: 150px;
	margin-bottom: 150px;
	button {
		cursor: pointer;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 600px;
`;

const ButtonDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: right;
`;

export default function MyPage() {
	return (
		<Body>
			<Container>
				<h1>MY PAGE</h1>
				<Form>
					{/* 개인 회원일 때 */}
					<Usercard />
					<UserVolList />
					<KeepVolList />
					<GroupList />
					{/* 기관 회원일 때 */}
					{/* <OrgCard /> */}
					{/* <OrgVolList1 /> */}
					{/* <OrgVolList2 /> */}
				</Form>
				<ButtonDiv>
					<UnregisterButton />
				</ButtonDiv>
			</Container>
		</Body>
	);
}
