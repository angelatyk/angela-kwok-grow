import { MouseEventHandler } from "react";
import "./IconButton.scss";

type Props = {
	actionType: "add" | "delete" | "done" | "favourite" | undefined;
	actionFunction?: MouseEventHandler;
};

function IconButton({ actionType, actionFunction }: Props) {
	return actionType && <div className={"icon-button " + actionType} onClick={actionFunction}></div>;
}

export default IconButton;
