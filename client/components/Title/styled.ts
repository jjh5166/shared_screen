import styled from "styled-components";
import { darken } from "polished";
import { theme } from "../../constants";

export const TitleContainer = styled.div`
  h1{
    font-family: 'Brandy';
    font-size: 4em;
    color: ${theme.bravo};
    text-shadow: -4px -2px ${theme.alpha}, -4px -5px ${theme.alpha};
    -webkit-text-stroke: 1px ${darken(0.2, theme.charlie)};
    paint-order: stroke fill;
    letter-spacing: 0.2rem;
  };
`