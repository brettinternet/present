import React from "react"
import { graphql } from "gatsby"
import css from "@emotion/css"
import styled from "@emotion/styled"

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

const pathRank = (path: string) => {
  return (path.match(/\//g) || []).length
}

const removeSlashes = (path: string) => {
  return path.replace(/\//g, "")
}

const sortPaths = (a, b) => {
  const aPath = pathRank(a)
  const bPath = pathRank(b)
  if (aPath === bPath) return removeSlashes(a) > removeSlashes(b) ? 1 : -1
  return aPath > bPath ? 1 : -1
}

const removeTrailingSlash = (str: string) => {
  return str.slice(-1) === "/" ? str.slice(0, -1) : str + "/"
}

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
            <a href={path}>{removeTrailingSlash(path)}</a>
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
    allSitePage(filter: { isCreatedByStatefulCreatePages: { eq: false } }) {
      edges {
        node {
          path
        }
      }
    }
  }
`