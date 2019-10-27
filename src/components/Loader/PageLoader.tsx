import React from "react"
import { LoaderSize, LoaderProps } from "./Loader.types"
import styled from "@emotion/styled"

import { Loader } from "./Loader"
import Portal from "../Portal"

interface OverlayProps {
  isOpaque: boolean
  transitionDuration: number
}

const Overlay = styled.div<OverlayProps>`
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms;
  opacity: ${({ isOpaque }) => (isOpaque ? 1 : 0)};
`

interface PageLoaderProps {
  children?: React.ReactNode
  /**
   * Whether loading is active
   */
  isLoading?: boolean

  /**
   * @default 500
   */
  transitionLag?: number

  /**
   * @default 250
   */
  transitionDuration?: number

  loaderProps: LoaderProps
}

interface PageLoaderState {
  isLoading: boolean
  isTransition: boolean
}

export class PageLoader extends React.Component<
  PageLoaderProps,
  PageLoaderState
> {
  static defaultProps: Partial<PageLoaderProps> = {
    transitionLag: 500,
    transitionDuration: 250,
  }
  private transitionLag: number
  private transitionDelay: number
  private overlayRef: React.RefObject<HTMLDivElement>

  constructor(props: PageLoaderProps) {
    super(props)

    this.overlayRef = React.createRef()

    this.state = {
      isLoading: props.isLoading,
      isTransition: false,
    }
  }

  componentDidUpdate(prevProps: PageLoaderProps) {
    const { isLoading, transitionLag } = this.props
    if (transitionLag && prevProps.isLoading !== isLoading) {
      this.toggleLoadingLag(transitionLag, isLoading)
    }
  }

  toggleLoadingLag = (delay: number, isLoading: boolean) => {
    // @ts-ignore 🙄
    this.transitionLag = setTimeout(
      () =>
        this.setState({ isLoading, isTransition: true }, this.stopTransition),
      delay
    )
  }

  stopTransition = () => {
    // @ts-ignore 🙄
    this.transitionDelay = setTimeout(
      () => this.setState({ isTransition: false }),
      this.props.transitionDuration
    )
  }

  componentWillUnmount() {
    clearTimeout(this.transitionLag)
    clearTimeout(this.transitionDelay)
  }

  render() {
    const { children, transitionDuration, loaderProps } = this.props
    const { isLoading, isTransition } = this.state

    const shouldUseLoader = isLoading || !children
    const showLoader = isTransition || shouldUseLoader

    return (
      <>
        {children}
        {showLoader && (
          <Portal id="loader">
            <Overlay
              ref={this.overlayRef}
              isOpaque={isLoading}
              transitionDuration={transitionDuration}
            >
              <Loader size={LoaderSize.lg} {...loaderProps} />
            </Overlay>
          </Portal>
        )}
      </>
    )
  }
}
