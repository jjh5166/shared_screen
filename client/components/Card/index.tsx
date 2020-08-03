import React from 'react';

import { CardContainer, HoverOverlay, CloseX, NoImageOverlay } from "./styled";
import { posterImagePath } from '../../utils/posterImagePath';
import { faceImagePath } from '../../utils/faceImagePath';

type ItemCardProps = {
  type: string,
  content: any,
  removeFn?: any,
  clickHandler?: any
};

export function ItemCard(
  { type, content, removeFn = null, clickHandler }: ItemCardProps) {
  const text: string = (type === "Film") ? content.title : content.name
  const imgPath = (type === "Film") ? posterImagePath(content.posterPath, 185) : faceImagePath(content.imagePath, 185)
  return (
    <CardContainer onClick={clickHandler} tabIndex="0">
      <img src={imgPath} />
      <HoverOverlay text={text}>
        {removeFn &&
          <CloseX onClick={async () => {
            removeFn(content.id)
          }} />
        }
      </HoverOverlay>
      {
        !content.posterPath &&
        !content.imagePath &&
        <NoImageOverlay text={text} />
      }
    </CardContainer>
  )
}