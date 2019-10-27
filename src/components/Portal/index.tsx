import React from "react"
import { createPortal } from "react-dom"
import usePortal from "./usePortal"

interface PortalProps {
  id: string
}

const Portal: React.SFC<PortalProps> = ({ id, children }) => {
  const target = usePortal(id)
  if (target) return createPortal(children, target)
  else return <>{children}</>
}

export default Portal
