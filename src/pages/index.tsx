import React from "react"
import { withPrefix, graphql } from "gatsby"
import css from "@emotion/css"
import styled from "@emotion/styled"
import { sortPaths, removeTrailingSlash } from "../utils/anchor"

import Layout from "../components/Layout"

const Wrapper = styled.div`
  font-family: "Raleway", sans-serif;
  /* max-width: 600px; */
  margin: auto;
  padding: 1rem;

  a {
    &,
    &:visited {
      color: blue;
    }

    &:hover {
      color: white;
      background: blue;
    }
  }
`

const IndexPage = ({ data }) => {
  const { author, presentationsDirname } = data.site.siteMetadata

  const paths: string[] = data.allSitePage.edges
    .map(({ node }) => node.path)
    .sort(sortPaths)

  return (
    <Layout headProps={{ title: "Home" }}>
      <Wrapper>
        <h1>
          {author.shortName}'s {presentationsDirname}
        </h1>
        {paths.map(path => (
          <p
            key={path}
            css={css`
              font-family: "Fira Mono", monospace;
            `}
          >
            {/* Link does not work here bc Reveal has no Destroy() */}
            <a href={withPrefix(path)}>{removeTrailingSlash(path)}</a>
          </p>
        ))}
      </Wrapper>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomePage {
    site {
      siteMetadata {
        presentationsDirname
        author {
          shortName
        }
      }
    }
    allSitePage(filter: { context: { presentation: { eq: true } } }) {
      edges {
        node {
          path
        }
      }
    }
  }
`
