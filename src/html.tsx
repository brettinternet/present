import React from "react"

interface HtmlProps {
  htmlAttributes: {}
  headComponents: []
  bodyAttributes: {}
  preBodyComponents: []
  body: string
  postBodyComponents: []
}

/**
 * @docs https://www.gatsbyjs.org/docs/custom-html/
 */
export default (props: HtmlProps) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <title>PDQ.com</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
