import { FaUserCircle } from "react-icons/fa";

interface Iprops {
	content: string;
}
export default function VolunteerComment(user: Iprops) {
	return (
		<>
			<div className="answer-read-container">
				<FaUserCircle size={40} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginLeft: "20px",
						width: "90%",
					}}
				>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<span style={{ marginRight: "10px" }}></span>
							<span style={{ color: "gray" }}>2023.03.14</span>
						</div>
						<div>
							<span>수정 |</span>
							<span> 삭제</span>
						</div>
					</div>
					<span>{user.content}</span>
				</div>
			</div>
		</>
	);
}
