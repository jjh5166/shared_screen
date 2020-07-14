import styled from "styled-components";

export const ResContainer = styled.div`
  height: 80%;
  width: 45%;
  outline: solid 2px green;
  display: flex;
  flex-wrap: wrap;
`
export const FilmCardContainer = styled.div`
  display: flex;
  height: 110px;
  width: 80px;
  position: relative;
  img{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    display: block;
    margin: 0 auto;
  }
`