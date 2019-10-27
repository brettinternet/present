import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

const globalStyles = css`
  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: "Raleway", sans-serif;
  }

  a {
    &:visited {
      color: black;
    }

    &:hover {
      font-weight: bold;
    }
  }
`

const App = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex-grow: 1;
`

const GlobalLayout = ({ children }) => {
  return (
    <App>
      <Global styles={globalStyles} />
      <Main>{children}</Main>
    </App>
  )
}

export default GlobalLayout
