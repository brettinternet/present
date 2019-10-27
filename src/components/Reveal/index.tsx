import React from "react"
import { Theme, Config } from "./Reveal.types"
import { css } from "@emotion/core"

import { PageLoader } from "../Loader"

const katexCss = require(`katex/dist/katex.min.css`)
const revealCss = require("reveal.js/css/reveal.css")

interface RevealerProps {
  config?: Config
  html: string
  separator?: string
  separatorVertical?: string
  separatorNotes?: string
  theme?: Theme
}

interface RevealerState {
  isLoading: boolean
}

/**
 * @todo: write `notes` plugin for react
 * https://github.com/hakimel/reveal.js/tree/master/plugin/notes
 * https://stackoverflow.com/questions/47574490/open-a-component-in-new-window-on-a-click-in-react?rq=1
 */
class Revealer extends React.Component<RevealerProps, RevealerState> {
  Reveal: any

  static defaultProps: Partial<RevealerProps> = {
    theme: Theme.WHITE,
    config: {
      hash: true,
    },
  }

  constructor(props: RevealerProps) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      this.Reveal = require("reveal.js")
      this.Reveal.initialize(this.props.config)
    }

    this.setState({
      isLoading: false,
    })
  }

  componentWillUnmount() {
    this.Reveal.removeEventListeners()
  }

  render() {
    const { isLoading } = this.state
    const { html, separator, separatorVertical } = this.props

    const themeCss = require(`reveal.js/css/theme/${this.props.theme}.css`)
    return (
      <article
        css={css`
          ${revealCss}
          ${katexCss}

          .reveal {
            height: 100vh !important;
            overflow: hidden;

            .gatsby-highlight-code-line {
              background-color: rgba(0, 0, 0, 0.5);
              display: block;
              /* margin-right: -1em; */
              margin-left: -1em;
              padding-right: 1em;
              padding-left: 0.75em;
              border-left: 0.25em solid rgba(255, 255, 255, 0.5);
            }

            ${themeCss}}
          }
        `}
      >
        <PageLoader isLoading={isLoading}>
          <div className="reveal">
            {this.renderHtml({
              html,
              separator,
              separatorVertical,
            })}
          </div>
        </PageLoader>
      </article>
    )
  }

  renderHtml = (props: {
    html: string
    separator: string
    separatorVertical: string
  }) => {
    return (
      <div
        className="slides"
        dangerouslySetInnerHTML={{
          __html: this.formatHtml(props),
        }}
      />
    )
  }

  formatHtml = ({
    html,
    separator = "\n<hr>\n",
    separatorVertical = "\n<p>—</p>\n",
  }: {
    html: string
    separator: string
    separatorVertical: string
  }) => {
    return html
      .split(separator)
      .map(
        section =>
          `<section>${section
            .split(separatorVertical)
            .map(vertSection => `<section>${vertSection}</section>`)
            .join("")}
          </section>`
      )
      .join("")
  }
}

export default Revealer
