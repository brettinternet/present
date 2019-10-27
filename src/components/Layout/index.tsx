import React from "react"

import Head, { HeadProps } from "./Head"

interface LayoutProps {
  headProps: HeadProps
}

const Layout: React.SFC<LayoutProps> = ({ children, headProps }) => {
  return (
    <>
      <Head {...headProps} />
      {children}
    </>
  )
}

export default Layout
