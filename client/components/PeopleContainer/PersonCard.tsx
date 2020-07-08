import { faceImagePath } from "../../utils/faceImagePath";
import { PCardContainer } from "./styled";

const PersonCard = ({ person }: any) => {

  return (
    <PCardContainer title={person.name}>
      <img src={faceImagePath(person.imagePath, 92)} />
    </PCardContainer>
  )
}

export default PersonCard;