import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Address from "../Address";
import { FieldValues, useForm } from "react-hook-form";
import Dropdown from "./Dropdown";
import { create } from "zustand";

const Body = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
const Left = styled.div`
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
	padding: 15px;
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


const VolunteerPost = () => {

// interface IVolunteerProps {
// 	setVolunteerData?: React.Dispatch<React.SetStateAction<{}>>;
// 	volunteerData?: any;
// }
// const VolunteerPost = ({ setVolunteerData, volunteerData }: IVolunteerProps) => {
const VolunteerPost = () => {
	const { register, watch, getValues } = useForm({ mode: "onChange" });

	const fileInput = useRef<HTMLLabelElement>(null);
	const onChangeHandler = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	};
	const [file, setFile] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState("");
	const post = window.location.pathname;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const selectedFiles = event.target.files as FileList;
			setFile(URL.createObjectURL(selectedFiles?.[0]));
		}
	};
	const optionArr = ["어린이", "노인", "장애인", "환경", "사회", "동물"];

	/** volunteerTop 컴포넌트에 submit 버튼이 없기 때문에,
	 * 8개의 input 값을 받아오려면 실시간으로 값의 변화를 객체에 할당해야 함
	 * 그래서 watch() / getValues() 라는 실시간 변화 값을 알려주는 메서드를 이용해서
	 * 객체에 담는것까진 성공,
	 *
	 * 이제 그 값을 상위 컴포넌트인 VolunteerPost.tsx에 넘겨야 하기 때문에
	 * 상위 컴포넌트에서 state를 props로 받고
	 * set 함수를 이용하여 state 값을 변화시키려고 하니 무한루프가 발생함
	 * 2023.03.17 zustand 사용해서 전역으로 관리하려고 시도중..
	 * */
	const newData = {
		// volunteerData: getValues(),
		volunteerData: getValues(),
		volunteerCategory: selectedOption,
	};

	interface IVolunteerData {
		volunteerData: FieldValues;
		setVolunteerData: () => void;
	}

	const volunData = create<IVolunteerData>((set) => ({
		volunteerData: {},
		setVolunteerData: () => set({ volunteerData: newData }),
	}));

	console.log(newData);
	return (
		<Body>
			<Container>
				<Left onClick={onChangeHandler}>
					<input id="profileImg" type="file" onChange={handleChange} />
					<img src={file ? file : "https://www.namepros.com/attachments/empty-png.89209/"} alt="" />
					<label htmlFor="profileImg" ref={fileInput}></label>
				</Left>
				{post !== "/post" ? (
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
							/>
						</Select>
						<Select>
							<span>모집기간</span>
							<input type="date" />
							<span> 부터 </span>
							<input {...register("endDate", { required: true })} type="date" />
						</Select>
						<Select>
							<span>봉사일시</span>
							<input type="date" />
							<span>시간</span>
							<input {...register("volunteerDate", { required: true })} type="time" />
						</Select>
						<Select>
							<span>활동시간</span>
							<input
								{...register("volunteerHour", { required: true })}
								style={{ width: "60px" }}
								type="number"
							/>
							시간
						</Select>
						<Select style={{ borderBottom: "3px solid black" }}>
							<span>봉사장소</span>
							<Address />
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
							<span>그룹명 </span>
							<input {...register("groupName", { required: true })} type="text" />
						</Select>
						<Select>
							<span>봉사분야 </span>

							<Dropdown
								option={optionArr}
								setSelectedOption={setSelectedOption}
								selectedOption={selectedOption}
								placeholder="분야를 선택해주세요"
							/>
						</Select>
						<Select>
							<span>활동 지역</span>
							<input {...register("place", { required: true })} type="text" />
						</Select>
						<Select>
							<span>최대 인원 </span>
							<input
								{...register("maxMember", { required: true })}
								style={{ width: "60px" }}
								type="number"
							/>
							명
						</Select>
					</Right>
				)}
			</Container>
		</Body>
	);
};

export default VolunteerPost;
