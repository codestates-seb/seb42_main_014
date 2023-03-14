import { FaEnvira } from "react-icons/fa";
import Carousel from "../../components/Carousel";
import Card from "../../components/volunteer/Card";
import Category from "../../components/volunteer/Category";
import SearchBar from "../../components/volunteer/SearchBar";

export default function Volunteer() {
	return (
		<>
			<SearchBar placeholder="검색어를 입력해 주세요." width={250} height={45} radius={10} />
			<Carousel />
			<Category />
			<div style={{ margin: "50px" }}>
				<Card
					width={380}
					height={350}
					src="/images/home/main-img-1.png"
					title="폐가구를 정리해요"
					date="일시 : 2023년 3월 10일 14~16시(2h)"
					place="장소 : 서울시 광진구"
					person="5 / 8"
					category={<FaEnvira size={24} />}
				/>
			</div>
		</>
	);
}
