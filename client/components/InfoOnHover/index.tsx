import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { InfoTextCont, HoverInfo } from './styled';

export const InfoOnHover = ({ infoText }: { infoText: string }) => {

  return (
    <HoverInfo>
      <FontAwesomeIcon icon={faInfoCircle} size="2x" />
      <InfoText infoText={infoText} />
    </HoverInfo>
  )
}

export const InfoText = ({ infoText }: { infoText: string }) => (
  <InfoTextCont>
    <p>{infoText}</p>
  </InfoTextCont>
)