import defaultImage from "@/assets/images/acorn.jpg";
import Image from "next/image";
import "./Avatar.scss";

type Props = {
	avatarImage: string | null | undefined;
	avatarAlt: string;
};

function Avatar({ avatarImage, avatarAlt }: Props) {
	return (
		<div className="avatar">
			<Image className="avatar__image" src={avatarImage ? avatarImage : defaultImage} alt={avatarAlt} width={0} height={0} sizes="100vw" />
		</div>
	);
}

export default Avatar;
