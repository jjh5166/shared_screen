import { faceImagePath } from "../../utils/faceImagePath";
import { PCardContainer, CloseX } from "./styled";
import { PersonData } from "../../interfaces";
import { useSelectedDispatch } from "../../context/selectedPeople";
import { useCreditsDispatch } from "../../context/credits";

const PersonCard = ({ person }: any) => {
  const selectedDispatch = useSelectedDispatch();
  const creditsDispatch = useCreditsDispatch();
  const clickHandler = (person: PersonData) => {
    selectedDispatch({ type: "REMOVE", payload: person });
    creditsDispatch({ type: "REMOVE", payload: person.id });
  }
  return (
    <PCardContainer title={person.name}>
      <CloseX onClick={async () => {
        clickHandler(person)
      }} />
      <img src={faceImagePath(person.imagePath, 185)} />
    </PCardContainer>
  )
}

export default PersonCard;