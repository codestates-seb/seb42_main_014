import { FaUserCircle } from "react-icons/fa";

interface Props {
	user: {
		id: number;
		name: string;
		ment: string;
	};
}

export default function GroupComment({ user }: Props): JSX.Element {
	return (
		<section>
			<div className="answer-read-container">
				<FaUserCircle size={40} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginLeft: "20px",
						width: "100%",
					}}
				>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<span style={{ marginRight: "10px" }}>{user.name}</span>
							<span style={{ color: "gray" }}>2023.03.14</span>
						</div>
						<div>
							<span>수정 |</span>
							<span> 삭제</span>
						</div>
					</div>
					<span>{user.ment}</span>
				</div>
			</div>
		</section>
	);
}
