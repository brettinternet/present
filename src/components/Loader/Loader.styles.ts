import styled from "@emotion/styled"
import { css, keyframes } from "@emotion/core"
import {
  RootStyleProps,
  CircleStyleProps,
  LoaderLabelPosition,
  LoaderSize,
} from "./Loader.types"

const spinAnimation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

export const Label = styled.div<{ color?: "string" }>`
  color: ${({ color }) => color || "black"};
  margin: 1rem 0 0;
  text-align: center;
`

export const Root = styled.div<RootStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: ${({ labelPosition }) => {
    switch (labelPosition) {
      case LoaderLabelPosition.top:
        return "column-reverse"
      case LoaderLabelPosition.right:
        return "row"
      case LoaderLabelPosition.left:
        return "row-reverse"
      default:
        return "column"
    }
  }};

  ${Label} {
    margin: ${({ labelPosition }) => {
      switch (labelPosition) {
        case LoaderLabelPosition.top:
          return "0 0 1rem"
        case LoaderLabelPosition.right:
          return "0 0 0 1rem"
        case LoaderLabelPosition.left:
          return "0 1rem 0 0"
        default:
          return "1rem 0 0"
      }
    }};
  }
`

export const Circle = styled.div<CircleStyleProps>`
  border-radius: 50%;
  /* Circular part (background color) */
  border: 1.5px solid ${({ secondaryColor }) => secondaryColor || "lightgray"};
  /* Spinning part (animated portion of the circle) */
  border-top-color: ${({ color }) => color || "black"};
  animation-name: ${spinAnimation};
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67);
  ${({ size }) => {
    switch (size) {
      case LoaderSize.xs:
        return css`
          width: 12px;
          height: 12px;
        `
      case LoaderSize.sm:
        return css`
          width: 16px;
          height: 16px;
        `
      case LoaderSize.md:
        return css`
          width: 20px;
          height: 20px;
        `
      case LoaderSize.lg:
        return css`
          width: 28px;
          height: 28px;
        `
    }
  }};
`
