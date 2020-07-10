import styled from "styled-components";

export const PplContainer = styled.div`
  outline: solid 2px blue;
  height: 75%;
  width: 30%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

// PersonCard

export const PCardContainer = styled.div`
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
export const CloseX = styled.div`
color: #fff;
background: gray;
position: absolute;
right: 0;
top: 0;
padding: 2px;
border-radius: 30px;
height: 15px;
width: 15px;
display: flex;
align-items: center;
justify-content: center;
&:before{
  content: "X"
}
`