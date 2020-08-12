import styled from 'styled-components';

export const TapeContainer = styled.div`
  width: 100%;
  overflow: auto hidden;
  height: 40px;
  display: inline-block;
  white-space: nowrap;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  };
`
export const CastCredit = styled.div`
  display: inline-block;
  height: 100%;
  width: fit-content;
  margin-right: 8px;
  div{
    text-align: left;
    white-space: nowrap;
    overflow: scroll hidden;
  }
`