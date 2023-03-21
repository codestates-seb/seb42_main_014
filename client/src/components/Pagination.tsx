import Pagination from "react-js-pagination";
import styled from "styled-components";

interface Props {
	totalPages: number;
	currentPage: number;
	onPageChange: (pageNumber: number) => void;
}

const Container = styled.div`
	margin-top: 10px;
	font-size: large;
	display: flex;
	width: 100%;
	justify-content: center;

	flex-direction: row;
	ul {
		list-style-type: none;
		background-color: #fffdfd;
	}
	ul.pagination li {
		font-size: 1.2rem;
		font-weight: bold;
		float: left;
		width: 30px;
		height: 30px;
		border: 1px solid #d8d8d8;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	ul.pagination li a {
		text-decoration: none;
		color: #000000;
		font-size: 1.2rem;
	}

	ul.pagination li.active a {
		color: #000000;
	}

	ul.pagination li.active {
		background-color: #338ddb;
	}

	ul.pagination li a:hover,
	ul.pagination li a.active {
		color: #04522d;
	}
`;

const Paginations = ({ totalPages, currentPage, onPageChange }: Props) => {
	return (
		<Container>
			<Pagination
				activePage={currentPage}
				totalItemsCount={totalPages}
				onChange={onPageChange}
				itemClass="page-item"
				linkClass="page-link"
			/>
		</Container>
	);
};

export default Paginations;
