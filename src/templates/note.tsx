import React from "react"
import { graphql } from "gatsby"

import Reveal from "../components/Reveal"
import { Global, css } from "@emotion/core"

interface Frontmatter {
  title: string
  date: string
  config: {}
}

interface NoteProps {
  data: {
    markdownRemark: {
      frontmatter: Frontmatter
      html: string
      rawMarkdownBody: string
    }
  }
}

const NoteTemplate: React.SFC<NoteProps> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  /**
   * https://github.com/PrismJS/prism/tree/master/themes
   */
  const prismThemePath = ""
  const prismThemeName = "prism-tomorrow"
  prismThemePath
    ? require(prismThemePath)
    : require(`prismjs/themes/${prismThemeName}.css`)

  return (
    <>
      <GlobalStyles />
      <Reveal config={frontmatter.config} html={html} />
    </>
  )
}

export const pageQuery = graphql`
  query NoteTemplate($filePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $filePath }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`

export default NoteTemplate

/**
 * @todo add line numbering styles
 * https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=prismjs#optional-add-line-numbering
 */
function GlobalStyles() {
  return (
    <Global
      styles={css`
        .gatsby-highlight-code-line {
          background-color: rgba(0, 0, 0, 0.5);
          display: block;
          margin-right: -1em;
          margin-left: -1em;
          padding-right: 1em;
          padding-left: 0.75em;
          border-left: 0.25em solid rgba(255, 255, 255, 0.5);
        }
      `}
    />
  )
}
