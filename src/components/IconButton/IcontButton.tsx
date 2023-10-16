import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MouseEventHandler } from "react";
import "./IconButton.scss";

type Props = {
	actionType: "add" | "delete" | "done" | "favourite" | undefined;
	actionFunction?: MouseEventHandler;
};

function IconButton({ actionType, actionFunction }: Props) {
	return (
		actionType && (
			<div className="icon-button" onClick={actionFunction}>
				{actionType === "add" && <AddIcon fontSize="inherit" />}
				{actionType === "delete" && <DeleteIcon fontSize="inherit" />}
				{actionType === "favourite" && <FavoriteBorderIcon fontSize="inherit" />}
			</div>
		)
	);
}

export default IconButton;
