import Pagination from "react-js-pagination";
import styled from "styled-components";

interface Props {
	totalPages: number;
	currentPage: number;
	itemsCountPerPage: number;
	onPageChange: (pageNumber: number) => void;
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 5px;

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 1.1rem;

		li {
			margin: 0 5px;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			cursor: pointer;
			transition: all 0.2s ease;

			&:hover {
				background-color: #d8d8d8;
			}

			&.active {
				background-color: #000000;
				a {
					color: #ffffff;
				}

				box-shadow: 0px 0px 5px 0px rgba(223, 223, 223, 0.5);
			}
		}

		a {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 100%;
			text-decoration: none;
			color: #000000;
			transition: all 0.3s ease;

			&:hover,
			&.active {
				color: #04522d;
			}
		}
	}
`;

const Paginations = ({ itemsCountPerPage, totalPages, currentPage, onPageChange }: Props) => {
	return (
		<Container>
			<Pagination
				activePage={currentPage}
				totalItemsCount={totalPages}
				onChange={onPageChange}
				itemsCountPerPage={itemsCountPerPage}
				itemClass="page-item"
				linkClass="page-link"
			/>
		</Container>
	);
};

export default Paginations;
