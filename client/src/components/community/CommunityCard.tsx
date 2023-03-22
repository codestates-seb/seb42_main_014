import styled from "styled-components";
import Button from "../../components/Button";
import { ReactNode } from "react";

const Container = styled.div`
	background-color: #ffffff;
	display: flex;
	width: 100%;
	justify-content: space-between;
	min-width: fit-content;
	height: fit-content;
	border-radius: 10px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.21);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	padding: 20px 40px;
	margin-bottom: 30px;
	cursor: pointer;
	img {
		width: 100%;
		width: 417px;
		height: 273px;
		border-radius: 10px;
	}
	:hover {
		transition-duration: 700ms;
		transform: scale(1.05);
	}
`;
const ImgDiv = styled.div`
	margin-right: 10px;
`;
const ContentDiv = styled.div`
	white-space: nowrap;
	height: fit-content;
	display: flex;
	flex-direction: column;
	padding: 0px 10px;
	span {
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}
`;
const ButtonDiv = styled.div`
	display: flex;
	justify-content: right;
	align-items: flex-end;
`;
const Flex = styled.div`
	display: flex;
	align-items: flex-end;
`;
interface IProps {
	src?: string;
	name?: string;
	place?: string;
	intro?: string;
	hashtag?: string;
	category?: ReactNode;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function CommunityCard({
	src,
	name,
	place,
	intro,
	hashtag,
	category,
	onClick,
}: IProps) {
	return (
		<Container onClick={onClick}>
			<Flex>
				<ImgDiv>
					<img src={src} alt="그룹 이미지" />
				</ImgDiv>
				<ContentDiv>
					<span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{name}</span>
					<span style={{ fontWeight: "bold" }}>{place}</span>
					<span dangerouslySetInnerHTML={{ __html: intro }}></span>
					<span>{hashtag}</span>
					<span>{category}</span>
				</ContentDiv>
			</Flex>
			<ButtonDiv>
				<Button
					value="함께하기"
					width={120}
					height={40}
					radius={10}
					textSize={17}
					bgColor="black"
				/>
			</ButtonDiv>
		</Container>
	);
}
