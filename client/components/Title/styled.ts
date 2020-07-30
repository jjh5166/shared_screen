import styled from "styled-components";
import { darken } from "polished";
import { theme, device } from "../../constants";

export const TitleContainer = styled.div`
  h1{
    font-family: 'Brandy';
    font-size: 2.5em;
    color: ${theme.bravo};
    paint-order: stroke fill;
    letter-spacing: 0.2rem;
    text-shadow:
    -1.5px -1.5px 0 ${darken(0.2, theme.charlie)},
    1.5px -1.5px 0 ${darken(0.2, theme.charlie)},
    -1.5px 1.5px 0 ${darken(0.2, theme.charlie)},
    1.5px 1.5px 0 ${darken(0.2, theme.charlie)},
    -3px -2px 0 ${theme.alpha},
    -3px -3px 0 ${theme.alpha};
    @media ${device.tablet} { 
      font-size: 5em;
    }
    @media ${device.laptop} { 
      text-shadow:
        -1.5px -1.5px 0 ${darken(0.2, theme.charlie)},
        1.5px -1.5px 0 ${darken(0.2, theme.charlie)},
        -1.5px 1.5px 0 ${darken(0.2, theme.charlie)},
        1.5px 1.5px 0 ${darken(0.2, theme.charlie)},
        -4px -2px 0 ${theme.alpha},
        -4px -5px 0 ${theme.alpha};
    }
  };
`