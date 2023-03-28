import styled from "styled-components";
import Button from "../../components/Button";
import { ReactNode, useEffect, useState } from "react";
import { GroupPost } from "../../api/community/CommunityPost";
import { myPageGet } from "../../api/mypage/MypageGet";

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
	member: boolean;
	disabled?: boolean;
	id: number;
	src?: string;
	name?: string;
	place?: string;
	intro?: string;
	hashtag?: string;
	category?: ReactNode;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function CommunityCard({
	id,
	src,
	name,
	place,
	intro,
	hashtag,
	category,
	onClick,
}: IProps) {
	const [member, setIsMember] = useState<boolean | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			const result = await myPageGet(`groups/${id}`);
			setIsMember(result.data.groupMember);
		};
		fetchData();
	}, [id]);

	const onGroup = () => {
		if (member) {
			alert("이미 가입된 사용자 입니다.");
		} else if (member === false) {
			if (window.confirm("이 그룹에 가입하시겠습니까?")) {
				const data = {
					groupId: id,
				};
				GroupPost(`member-groups/${id}`, data);
			}
		}
	};

	return (
		<Container onClick={onClick}>
			<Flex>
				<ImgDiv>
					<img
						src={
							src
								? src
								: "https://main014-bucket.s3.ap-northeast-2.amazonaws.com/images/volunteer/volunteer.jpg"
						}
						alt="그룹 이미지"
					/>
				</ImgDiv>
				<ContentDiv>
					<div>
						<span style={{ marginRight: "10px" }}>{category}</span>
						<span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{name}</span>
					</div>

					<span style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: intro }}></span>
					<span>{place}</span>
					<span>{hashtag}</span>
				</ContentDiv>
			</Flex>
			<ButtonDiv>
				<Button
					onClick={onGroup}
					value="함께하기"
					width={120}
					height={40}
					radius={10}
					textSize={17}
				/>
			</ButtonDiv>
		</Container>
	);
}
