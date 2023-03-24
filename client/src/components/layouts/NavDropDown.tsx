import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { myPageGet } from "../../api/mypage/MypageGet";

interface TDropDownProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}
const StyledDropDownMenu = styled.span`
	text-align: center;
	:hover {
		background-color: #f1f0f0;
		transition: all 0.3s;
	}
	padding: 10px;
`;
const StyledDropDownContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5px;
`;
const StyledAdminDropDownItems = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function DropDown({ setIsOpen, isOpen }: TDropDownProps) {
	const isLogin = localStorage.getItem("accessToken");
	const [isAdmin, setIsAdmin] = useState(true);

	const handleDropdownClick = () => {
		setIsOpen(!isOpen);
	};
	const navigate = useNavigate();
	const [id, setId] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet("members/me");
			setId(result.data.id);
		};
		fetchData();
	}, []);
	const LoginHandler = () => {
		if (isLogin) {
			localStorage.removeItem("accessToken");
			navigate("/");
		} else {
			navigate("/login");
		}
	};
	const Mypage = () => {
		if (isLogin) {
			navigate(`/mypage`);
		} else {
			alert("로그인 페이지로 이동합니다. ");
			navigate("/login");
		}
	};

	return (
		<>
			<StyledDropDownContainer onClick={handleDropdownClick}>
				<StyledDropDownMenu onClick={Mypage}>마이페이지</StyledDropDownMenu>
				<StyledDropDownMenu onClick={LoginHandler}>
					{isLogin ? "로그아웃" : "로그인"}
				</StyledDropDownMenu>
				{isLogin && (
					<StyledAdminDropDownItems>
						<StyledDropDownMenu onClick={() => navigate("/register")}>
							봉사활동 등록
						</StyledDropDownMenu>
					</StyledAdminDropDownItems>
				)}
			</StyledDropDownContainer>
		</>
	);
}
