import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Helmet from "react-helmet"

interface MetaTag {
  property?: string
  name?: string
  content: string
}

export interface HeadProps {
  title: string
  description?: string
  lang?: string
  meta?: MetaTag[]
}

const Head: React.SFC<HeadProps> = ({
  lang = "en",
  title,
  description,
  meta,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              socialHandles {
                twitter
              }
            }
            fontLink
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author.socialHandles.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        // @ts-ignore
      ].concat(meta || [])}
      link={[
        {
          href: site.siteMetadata.fontLink,
          rel: "stylesheet",
        },
      ]}
    />
  )
}

export default Head
