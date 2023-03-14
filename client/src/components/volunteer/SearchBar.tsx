import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

interface TPropsSearchBar {
	placeholder: string;
	width: number;
	height: number;
	radius: number;
}

export default function SearchBar({ placeholder, width, height, radius }: TPropsSearchBar) {
	const StyledSearchBarDiv = styled.div`
		width: ${width}px;
		height: ${height}px;
		border-radius: ${radius}px;
		border: 1px solid gray;
		display: flex;
		align-items: center;
	`;

	const StyledSearchInput = styled.input`
		border: none;
		margin: 10px;
		width: ${width - 15}px;
		height: ${height - 15}px;
		outline: none;
	`;

	return (
		<>
			<StyledSearchBarDiv>
				<IoIosSearch style={{ marginLeft: "15px" }} size={24} />
				<StyledSearchInput placeholder={placeholder} />
			</StyledSearchBarDiv>
		</>
	);
}
