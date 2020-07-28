import React from 'react';

import { CardContainer, CardOverlay, CloseX } from "./styled";

type ItemCardProps = {
  id?: number
  name: string,
  imgPath: string,
  removeFn?: any
  clickHandler?: any
};

export function ItemCard(
  { id, name, imgPath, removeFn = null, clickHandler }: ItemCardProps) {

  return (
    <CardContainer onClick={clickHandler}>
      <img src={imgPath} />
      <CardOverlay text={name}>
        {removeFn &&
          <CloseX onClick={async () => {
            removeFn(id)
          }} />
        }
      </CardOverlay>
    </CardContainer>
  )
}