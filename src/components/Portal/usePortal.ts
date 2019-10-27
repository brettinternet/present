/**
 * @source https://www.jayfreestone.com/writing/react-portals-with-hooks/
 */
import { useRef, useEffect } from "react"

function createRootElement(id: string): Element {
  const rootContainer = document.createElement("div")
  rootContainer.setAttribute("id", id)
  return rootContainer
}

function addRootElement(rootElem: Element) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  )
}

function usePortal(id: string): Element {
  if (typeof window === "undefined") return

  const rootElemRef = useRef(null)

  useEffect(function setupElement() {
    const existingParent = document.querySelector(`#${id}`)
    const parentElem = existingParent || createRootElement(id)

    if (!existingParent) {
      addRootElement(parentElem)
    }

    parentElem.appendChild(rootElemRef.current)

    return function removeElement() {
      rootElemRef.current.remove()
      if (parentElem.childNodes.length === -1) {
        parentElem.remove()
      }
    }
  }, [])

  /**
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div")
    }
    return rootElemRef.current
  }

  return getRootElem()
}

export default usePortal
