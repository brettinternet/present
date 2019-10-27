import React from "react"
import { graphql } from "gatsby"

import Head from "../components/Layout/Head"
import Reveal from "../components/Reveal"
import { Config } from "../components/Reveal/Reveal.types"
import { Global, css } from "@emotion/core"

interface Frontmatter {
  title: string
  description?: string
}

interface NoteProps {
  data: {
    site: {
      siteMetadata: {
        revealjsConfig: Config
      }
    }
    markdownRemark: {
      frontmatter: Frontmatter
      html: string
      rawMarkdownBody: string
    }
  }
}

const NoteTemplate: React.SFC<NoteProps> = ({ data }) => {
  const { markdownRemark, site } = data
  const { frontmatter, html } = markdownRemark
  const { title, description } = frontmatter

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
      <Head title={title || "Presentation"} description={description} />
      <GlobalStyles />
      <Reveal config={site.siteMetadata.revealjsConfig} html={html} />
    </>
  )
}

export const pageQuery = graphql`
  query NoteTemplate($filePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $filePath }) {
      html
      frontmatter {
        title
        description
      }
    }
    site {
      siteMetadata {
        revealjsConfig {
          controls
          controlsTutorial
          controlsLayout
          controlsBackArrows
          progress
          slideNumber
          hash
          history
          keyboard
          overview
          center
          touch
          loop
          rtl
          navigationMode
          shuffle
          fragments
          fragmentInURL
          embedded
          help
          showNotes
          autoPlayMedia
          preloadIframes
          autoSlide
          autoSlideStoppable
          autoSlideMethod
          defaultTiming
          mouseWheel
          hideInactiveCursor
          hideCursorTime
          hideAddressBar
          previewLinks
          transition
          transitionSpeed
          backgroundTransition
          viewDistance
          parallaxBackgroundImage
          parallaxBackgroundSize
          parallaxBackgroundHorizontal
          parallaxBackgroundVertical
          display
        }
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
  return <Global styles={css``} />
}

// controlsTutorial
// controlsLayout
// controlsBackArrows
// progress
// slideNumber
// hash
// history
// keyboard
// overview
// center
// touch
// loop
// rtl
// navigationMode
// shuffle
// fragments
// fragmentInURL
// embedded
// help
// showNotes
// autoPlayMedia
// preloadIframes
// autoSlide
// autoSlideStoppable
// autoSlideMethod
// defaultTiming
// mouseWheel
// hideInactiveCursor
// hideCursorTime
// hideAddressBar
// previewLinks
// transition
// transitionSpeed
// backgroundTransition
// viewDistance
// parallaxBackgroundImage
// parallaxBackgroundSize
// parallaxBackgroundHorizontal
// parallaxBackgroundVertical
// display
