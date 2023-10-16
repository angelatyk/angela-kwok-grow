import PlantCard from "@/components/PlantCard/PlantCard";
import "./PlantList.scss";

type Props = {
	plantList: any[];
};

export default function PlantList({ plantList }: Props) {
	return <div className="plant-list">{plantList && plantList.map((plant: any, index: number) => <PlantCard key={index} plant={plant} />)}</div>;
}
