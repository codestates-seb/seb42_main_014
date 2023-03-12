import Card from "../../components/Card";
import { FaEnvira } from "react-icons/fa";

export default function Volunteer() {
	return (
		<div style={{ margin: "50px" }}>
			<Card
				src="/images/home/main-img-1.png"
				title="폐가구를 정리해요"
				date="일시 : 2023년 3월 10일 14~16시(2h)"
				place="장소 : 서울시 광진구"
				person="5 / 8"
				category={<FaEnvira size={24} />}
			/>
		</div>
	);
}
