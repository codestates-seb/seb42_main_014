import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Address from "../../components/Address";
import { useForm } from "react-hook-form";
import Dropdown from "../../components/volunteer/Dropdown";
import TextEdit from "../../components/volunteer/TextEdit";
import { volunteerDataPost } from "../../api/volunteer/volunteerData";
import { useNavigate } from "react-router-dom";
import { imageUploadPost } from "../../api/imgPost";
import dayjs from "dayjs";

const Body = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-direction: column;
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	& > div:first-child {
		display: flex;
		align-items: center;
	}
`;
const Left = styled.div`
	background-color: green;
	box-sizing: content-box;
	cursor: pointer;
	input {
		display: none;
	}
	background-color: #ffffff;
	height: fit-content;
	border: 3px solid black;
	width: 500px;
	height: 400px;
	margin-bottom: 10px;
	img {
		width: 500px;
		height: 400px;
	}
`;
const Right = styled.div`
	padding: 20px 0px 15px 15px;
	display: flex;
	margin-left: 20px;
	margin-bottom: 20px;
	justify-content: center;
	flex-direction: column;
`;
const Select = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 5px;
	margin-top: 5px;
	margin-bottom: 5px;
	border-bottom: 3px solid black;
	height: max-content;
	width: 100%;

	span {
		white-space: nowrap;
		font-weight: 900;
		margin-right: 15px;
		font-size: 1.35rem;
	}
	span:nth-child(3) {
		font-weight: 700;
		margin-right: 15px;
		margin-left: 15px;
		font-size: 1.1rem;
	}
	input {
		border: none;
		font-size: 1rem;
		width: 100%;
		:focus {
			outline: none;
		}
		::-webkit-calendar-picker-indicator {
			cursor: pointer;
			font-size: 20px;
		}
	}
`;
const Bar = styled.div`
	margin-bottom: 20px;
	border-bottom: 3px solid black;
	line-height: 50px;
	color: #000000;
	width: 100%;
	height: max-content;
	text-align: center;
	font-size: 1.35rem;
	font-weight: 900;
`;
const Btn = styled.button`
	/* 기존 */
	cursor: pointer;
	font-size: 1.35rem;
	background-color: #a50000;
	color: white;
	height: max-content;
	margin-bottom: 120px;
	padding: 10px 0;
	border-radius: 10px;
	width: 100%;
`;

const Content = styled.div`
	min-width: 970px;
	display: flex;
	flex-direction: column;
`;

const VolunteerPost = () => {
	interface IPostData {
		title?: string;
		applyDate?: string;
		volunteerDate?: string;
		volunteerHour?: number;
		placeDetail?: string;
		memberCount?: number;
		place?: string;
		applyLimit?: number;
		groupName?: string;
		volunteerTime: number;
	}

	const [file, setFile] = useState<any>("");
	const [value, setValue] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [selectedArea, setSelectedArea] = useState("");
	const [selectedSubArea, setSelectedSubArea] = useState("");
	const [fileSrc, setFileSrc] = useState<any>("");
	const [imageUrl, setImageUrl] = useState<any>("");
	const { register, handleSubmit } = useForm<IPostData>({ mode: "onChange" });
	const fileInput = useRef<HTMLLabelElement>(null);
	const onChangeHandler = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	};

	const date = dayjs();

	const optionArr = ["어린이", "노인", "장애인", "환경", "동물"];
	const post = window.location.pathname;

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const selectedFiles = (await event.target.files) as FileList;
			setFile(URL.createObjectURL(selectedFiles?.[0])); // 이미지 미리보기를 위한 state
			setFileSrc(selectedFiles[0]); // 이미지를 s3로 보내기 위한 Src를 저장하는 state
		}
	};

	useEffect(() => {
		if (fileSrc) {
			imageUploadPost(fileSrc, setImageUrl); // 이미지를 s3로 보내는 POST 요청
		}
	}, [fileSrc]);

	// console.log(imageUrl);

	const navigate = useNavigate();

	const TextChange = (content: string) => {
		setValue(content);
	};
	const hour = date.format("HH:mm");
	const onSubmit = (data: IPostData) => {
		const {
			title,
			applyDate,
			volunteerDate,
			volunteerHour,
			placeDetail,
			memberCount,
			volunteerTime,
			groupName,
			applyLimit,
		} = data;
		const postVolunteerData = {
			title,
			volunteerImage: imageUrl,
			applyDate: `${applyDate}T${hour}`,
			volunteerDate: `${volunteerDate}T${volunteerHour}`,
			volunteerTime: Number(volunteerTime),
			place: `${selectedArea} ${selectedSubArea} ${placeDetail}`,
			content: value,
			applyLimit: Number(memberCount),
			tagName: selectedOption,
		};

		const postGroupData = {
			groupName,
			groupImage: imageUrl,
			applyLimit: Number(applyLimit),
			place: `${selectedArea} ${selectedSubArea}`,
			content: value,
			tagName: selectedOption,
		};

		if (post === "/register") {
			try {
				volunteerDataPost("volunteers", postVolunteerData);
				navigate("/volunteer");
			} catch (err) {
				alert("봉사 등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
			}
		} else if (post === "/grouppost") {
			try {
				volunteerDataPost("groups", postGroupData);
				navigate("/community");
			} catch (err) {
				alert("그룹 등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
			}
		}
	};

	return (
		<Body>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Container>
					<div>
						<Left onClick={onChangeHandler}>
							<input id="profileImg" type="file" onChange={handleChange} />
							<img
								src={file ? file : "https://www.namepros.com/attachments/empty-png.89209/"}
								alt=""
							/>
							<label htmlFor="profileImg" ref={fileInput}></label>
						</Left>
						{post !== "/grouppost" ? (
							<Right>
								<Select>
									<span>활동명</span>
									<input {...register("title", { required: true })} type="text" />
								</Select>
								<Select>
									<span>봉사분야</span>
									<Dropdown
										setSelectedOption={setSelectedOption}
										selectedOption={selectedOption}
										placeholder="분야를 선택해주세요"
										option={optionArr}
										width={145}
									/>
								</Select>
								<Select>
									<span>모집기간</span>
									<input type="date" {...register("applyDate", { required: true })} />
								</Select>
								<Select>
									<span>봉사일시</span>
									<input type="date" {...register("volunteerDate", { required: true })} />
									<span>시간</span>
									<input {...register("volunteerHour", { required: true })} type="time" />
								</Select>
								<Select>
									<span>활동시간</span>
									<input
										{...register("volunteerTime", { required: true })}
										style={{ width: "60px" }}
										type="number"
									/>
									시간
								</Select>
								<Select style={{ borderBottom: "3px solid black" }}>
									<span>봉사장소</span>
									<Address
										selectedArea={selectedArea}
										setSelectedArea={setSelectedArea}
										selectedSubArea={selectedSubArea}
										setSelectedSubArea={setSelectedSubArea}
									/>
								</Select>
								<Select>
									<span>상세주소</span>
									<input
										{...register("placeDetail", { required: true })}
										style={{ backgroundColor: "#f9f9f9" }}
										type="text"
										placeholder="상세 주소를 작성해주세요."
									/>
								</Select>
								<Select>
									<span>모집인원</span>
									<input
										{...register("memberCount", { required: true })}
										style={{ width: "60px" }}
										type="number"
									/>
									명
								</Select>
							</Right>
						) : (
							<Right>
								<Select>
									<span>그룹명</span>
									<input {...register("groupName", { required: true })} type="text" />
								</Select>
								<Select>
									<span>봉사분야</span>

									<Dropdown
										option={optionArr}
										setSelectedOption={setSelectedOption}
										selectedOption={selectedOption}
										placeholder="분야를 선택해주세요"
									/>
								</Select>
								<Select style={{ borderBottom: "3px solid black" }}>
									<span>활동 지역</span>
									<Address
										selectedArea={selectedArea}
										setSelectedArea={setSelectedArea}
										selectedSubArea={selectedSubArea}
										setSelectedSubArea={setSelectedSubArea}
									/>
								</Select>
								<Select>
									<span>최대 인원</span>
									<input
										{...register("applyLimit", { required: true })}
										style={{ width: "60px" }}
										type="number"
									/>
									명
								</Select>
							</Right>
						)}
					</div>
					<Bar>활동정보</Bar>
				</Container>
				<Content>
					<TextEdit onChange={TextChange} value={value} />
					<Btn>등록완료</Btn>
				</Content>
			</form>
		</Body>
	);
};

export default VolunteerPost;
