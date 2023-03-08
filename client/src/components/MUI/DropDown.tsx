import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TbUserCircle } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function DropDown() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				style={{ color: "white" }}
			>
				<TbUserCircle size={40} />
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<Link to={"/mypage"} style={{ textDecoration: "none", color: "black" }}>
					<MenuItem onClick={handleClose}>마이페이지</MenuItem>
				</Link>
				<MenuItem onClick={handleClose}>로그아웃</MenuItem>
			</Menu>
		</div>
	);
}
