import { SvgIcon } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdGroup, MdOutlinePersonPin } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ForestIcon from "@mui/icons-material/Forest";
import PetsIcon from "@mui/icons-material/Pets";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AccessibleIcon from "@mui/icons-material/Accessible";

const StyledContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* min-width: 800px; */
	width: 100%;
	margin-bottom: 10px;
	max-width: 910px;
	section {
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
		width: 100%;
		margin: 10px;
		/* min-width: 839px; */
	}
	h1 {
		text-align: center;
	}
	img {
		width: 400px;
		height: 300px;
		border-radius: 10px;
	}
	.layout {
		display: flex;
		align-items: center;
		span {
			margin-left: 10px;
		}
		margin-bottom: 5px;
	}
`;
const Flex = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function GroupInfo({ groupData }: any) {
	const { applyLimit, content, groupImage, groupName, place, tagName } = groupData;
	const categoryItems = {
		어린이: ChildCareIcon,
		장애인: AccessibleIcon,
		노인: ElderlyIcon,
		동물: PetsIcon,
		환경: ForestIcon,
	};

	return (
		<StyledContainerDiv>
			<Link to={"/community"}>
				<div style={{ width: "50%", margin: "10px", cursor: "pointer", minWidth: "913px" }}>
					<FaArrowLeft size={45} />
				</div>
			</Link>
			<section>
				<Flex>
					<div style={{ marginRight: "10px" }}>
						<SvgIcon
							component={
								tagName === "어린이"
									? categoryItems["어린이"]
									: tagName === "장애인"
									? categoryItems["장애인"]
									: tagName === "노인"
									? categoryItems["노인"]
									: tagName === "동물"
									? categoryItems["동물"]
									: tagName === "환경"
									? categoryItems["환경"]
									: null
							}
							inheritViewBox
						/>
					</div>
					<h1>{groupName}</h1>
				</Flex>
			</section>
			<section style={{ display: "flex", padding: "20px" }}>
				<img
					src={
						groupImage
							? groupImage
							: "https://main014-bucket.s3.ap-northeast-2.amazonaws.com/profile/pexels-min-an-853168.jpg"
					}
					alt="그룹 사진"
				/>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<div style={{ marginLeft: "20px" }}>
						<div className="layout">
							<MdGroup size={30} />
							<span>그룹 소개</span>
						</div>
						<div dangerouslySetInnerHTML={{ __html: content }}></div>
					</div>
					<div style={{ margin: "20px 0px 0px 20px" }}>
						<div className="layout">
							<MdOutlinePersonPin size={30} />
							<span>모집 인원</span>
						</div>
						<div>{applyLimit}명</div>
					</div>
					<div style={{ margin: "20px" }}>
						<div className="layout">
							<FiMapPin size={30} />
							<span>활동 지역</span>
						</div>
						<div>{place}</div>
					</div>
				</div>
			</section>
		</StyledContainerDiv>
	);
}
