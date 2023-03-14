import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const Container = styled.div`
	.ql-container {
		min-height: 700px;
		max-height: 18rem;
		height: 100%;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
	.ql-toolbar.ql-snow {
	}
`;

export default function Edit() {
	return (
		<Container>
			<ReactQuill />
		</Container>
	);
}
