import styled from 'styled-components'

export const LayoutContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 4% 1fr;
`
export const LayoutHeader = styled.header`
  nav{
    width: 100%;
  }
`
export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`