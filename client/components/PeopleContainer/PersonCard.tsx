import { faceImagePath } from "../../utils/faceImagePath";
import { PersonData } from "../../interfaces";
import { useSelectedDispatch } from "../../context/selectedPeople";
import { useCreditsDispatch } from "../../context/credits";
import { useSharedDispatch } from "../../context/sharedCredits";
import { ItemCard } from "../Card";

const PersonCard = ({ person }: { person: PersonData }) => {
  const selectedDispatch = useSelectedDispatch();
  const creditsDispatch = useCreditsDispatch();
  const sharedDispatch = useSharedDispatch();
  const clickHandler = (personId: number) => {
    selectedDispatch({ type: "REMOVE", payload: personId });
    creditsDispatch({ type: "REMOVE", payload: personId });
    sharedDispatch({ type: "REMOVE", payload: personId });
  }
  return (
    <ItemCard
      id={person.id}
      name={person.name}
      imgPath={faceImagePath(person.imagePath, 185)}
      removeFn={clickHandler}
    />
  )
}

export default PersonCard;