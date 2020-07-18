import styled from "styled-components";
import { theme } from '../../constants';
import { lighten } from 'polished';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  position: relative;
  align-items: center;
  input{
    width: 100%;
    border-radius: 30px;
    background: ${lighten(0.1, theme.background)};
    border-color: ${theme.alpha};
    &:focus{
      box-shadow: ${theme.alpha};
      outline: ${theme.alpha};
    }
  };
`
export const PplResultsSection = styled.section`
  min-height: 60%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`