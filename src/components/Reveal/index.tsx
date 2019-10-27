import React from "react"
import { Theme, Config } from "./Reveal.types"
import { Global, css } from "@emotion/core"

// import Reveal from "reveal.js"
import { PageLoader } from "../Loader"

const katexCss = require(`katex/dist/katex.min.css`)

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
      require("reveal.js").initialize(this.props.config)
    }

    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { isLoading } = this.state
    const { html, separator, separatorVertical } = this.props

    const revealCss = require("reveal.js/css/reveal.css")
    const themeCss = require(`reveal.js/css/theme/${this.props.theme}.css`)
    return (
      <PageLoader isLoading={isLoading} style={{ height: "100%" }}>
        <Global
          styles={css`
            ${revealCss}
            ${katexCss}
            .reveal {
              height: 100vh !important;
              overflow: hidden;

              ${themeCss}}
            }
          `}
        />
        <div className="reveal">
          {this.renderHtml({
            html,
            separator,
            separatorVertical,
          })}
        </div>
      </PageLoader>
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
