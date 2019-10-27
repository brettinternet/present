import React from "react"

export enum LoaderLabelPosition {
  "top",
  "right",
  "left",
}

export enum LoaderSize {
  "xs",
  "sm",
  "md",
  "lg",
}

export interface RootStyleProps {
  labelPosition: LoaderLabelPosition
}

export interface CircleStyleProps {
  /**
   * Determines how big the loading indicator is
   */
  size: LoaderSize

  /**
   * color of the piece that rotates
   * @default 'black'
   */
  color?: string

  /**
   * Color of the circle
   * @default 'lightgray'
   */
  secondaryColor?: string
}

export interface LoaderProps {
  /**
   * Determines which direction the label is
   * in relation to the spinner
   */
  labelPosition?: LoaderLabelPosition

  /**
   * Size of the loading spinner
   */
  size?: LoaderSize

  /**
   * Label text
   */
  label?: string | React.ReactNode

  /**
   * Invert the color scheme
   */
  inverted?: boolean

  className?: string
  style?: React.CSSProperties
}
