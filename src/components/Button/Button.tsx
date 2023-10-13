import Image from "next/image";
import { MouseEventHandler } from "react";
import "./Button.scss";

type Props = {
	label: string;
	iconSrc?: string;
	iconAlt?: string;
	className?: string;
	buttonType: "submit" | "reset" | "button" | undefined;
	actionFunction?: MouseEventHandler;
};

function Button({ label, iconSrc, iconAlt, className, buttonType, actionFunction }: Props) {
	return (
		<button className={"button " + (className ? className : "")} type={buttonType} onClick={actionFunction}>
			{iconSrc && iconAlt && <Image className="button__icon" src={iconSrc} alt={iconAlt} />}
			{label}
		</button>
	);
}

export default Button;
