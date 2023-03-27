import ChildCareIcon from "@mui/icons-material/ChildCare";
import ForestIcon from "@mui/icons-material/Forest";
import PetsIcon from "@mui/icons-material/Pets";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AccessibleIcon from "@mui/icons-material/Accessible";
import SvgIcon from "@mui/material/SvgIcon";
import styled from "styled-components";
import { useState } from "react";
import { theme } from "../../utils/theme";

interface CategoryProps {
	onCategoryClick: (category: string) => void;
}

const Body = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	margin: 20px;
`;
const Flex = styled.div`
	width: 70%;
	height: 100%;
	display: flex;
	justify-content: space-between;
`;

const Icon = styled.div`
	font-size: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid rgb(193, 193, 193);
	border-radius: 50%;
	width: 90px;
	height: 90px;
	color: #000000;
	cursor: pointer;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13), 0 1px 2px rgba(0, 0, 0, 0.21);
	:hover {
		background-color: #b3e2c6;
		color: white;
	}
	&.active {
		background-color: ${theme.primary};
		border: 1px solid gray;
		color: white;
	}
`;
const Col = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	span {
		font-size: 20px;
		font-weight: bold;
	}
`;
const AllCategoryDiv = styled.div`
	font-size: 30px;
`;

export default function Category({ onCategoryClick }: CategoryProps) {
	const [isClicked, setIsClicked] = useState("");
	const handleClick = (category: string) => {
		onCategoryClick(category);
		setIsClicked(category);
	};

	const categoryItems = [
		{ key: "", name: "전체", icon: "ALL" },
		{ key: "어린이", name: "어린이", icon: ChildCareIcon },
		{ key: "장애인", name: "장애인", icon: AccessibleIcon },
		{ key: "노인", name: "노인", icon: ElderlyIcon },
		{ key: "동물", name: "동물", icon: PetsIcon },
		{ key: "환경", name: "환경", icon: ForestIcon },
	];
	return (
		<Body>
			<Flex>
				{categoryItems?.map((el) => {
					return (
						<>
							<Col onClick={() => handleClick(el.key)}>
								<Icon className={isClicked === el.name ? "active" : ""}>
									{typeof el.icon === "string" ? (
										<AllCategoryDiv>{el.icon}</AllCategoryDiv>
									) : (
										<SvgIcon
											component={el.icon ? el.icon : null}
											inheritViewBox
											fontSize="inherit"
										/>
									)}
								</Icon>
								<span>{el.name}</span>
							</Col>
						</>
					);
				})}
			</Flex>
		</Body>
	);
}
