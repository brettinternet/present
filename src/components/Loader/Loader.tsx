import React from "react"

import { Root, Circle, Label } from "./Loader.styles"

import { LoaderProps, LoaderSize } from "./Loader.types"

export const Loader: React.SFC<LoaderProps> = ({
  className,
  labelPosition,
  label,
  size = LoaderSize.sm,
  style,
  inverted,
}) => (
  <Root
    style={style}
    className={className}
    labelPosition={labelPosition}
    aria-label="Loading"
  >
    <Circle size={size} inverted={inverted} />
    {label && <Label>{label}</Label>}
  </Root>
)
