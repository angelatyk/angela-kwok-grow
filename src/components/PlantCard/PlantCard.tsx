import IconButton from "@/components/IconButton/IcontButton";
import "./PlantCard.scss";

type Props = {
	plant: any;
};

export default function PlantCard({ plant }: Props) {
	return (
		<>
			<article className="plant-card">
				<div className="plant-card__image-container">
					<img className="plant-card__image" src={plant?.default_image?.original_url} alt={plant.common_name + " Image"} />
				</div>
				<div className="plant-card__details-container">
					<h2>{plant.common_name}</h2>
					<div className="action-buttons">
						<IconButton actionType="favourite" />
						<IconButton actionType="add" />
					</div>
				</div>
			</article>
		</>
	);
}
