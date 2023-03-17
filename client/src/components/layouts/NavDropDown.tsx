import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface TDropDownProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}

export default function DropDown({ setIsOpen, isOpen }: TDropDownProps) {
	const [isAdmin, setIsAdmin] = useState(true);
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
	const handleDropdownClick = () => {
		setIsOpen(!isOpen);
	};
	const navigate = useNavigate();

	return (
		<>
			<StyledDropDownContainer onClick={handleDropdownClick}>
				<StyledDropDownMenu onClick={() => navigate("/mypage")}>마이페이지</StyledDropDownMenu>
				<StyledDropDownMenu onClick={() => navigate("/login")}>
					{/* {isAdmin ? "로그아웃" : "로그인"} */}
					로그인
				</StyledDropDownMenu>
				{isAdmin && (
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
