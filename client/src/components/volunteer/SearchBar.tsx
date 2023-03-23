import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

interface IPropsSearchBar {
	placeholder: string;
}

const StyledSearchBarDiv = styled.div`
	width: 250px;
	height: 45px;
	border-radius: 10px;
	border: 1px solid gray;
	display: flex;
	align-items: center;
`;

const StyledSearchInput = styled.input`
	border: none;
	margin: 10px;
	width: 235px;
	height: 30px;
	outline: none;
`;

export default function SearchBar({ placeholder }: IPropsSearchBar) {
	return (
		<>
			<StyledSearchBarDiv>
				<IoIosSearch style={{ marginLeft: "15px" }} size={24} />
				<StyledSearchInput placeholder={placeholder} />
			</StyledSearchBarDiv>
		</>
	);
}
