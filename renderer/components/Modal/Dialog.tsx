import React, { ReactElement, ReactNode, useEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

const Dialog: React.FunctionComponent<Props> = ({
  onClose,
  visible,
  children,
  closeOnClickMask,
}) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    e.preventDefault()
    onClose && onClose(e)
  }
  const onClickMask: React.MouseEventHandler = (e) => {
    if (closeOnClickMask) onClose && onClose(e)
  }
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      onClickClose(e as unknown as React.MouseEvent<Element, MouseEvent>)
    }
    const Node = document.getElementById("dialog-close")
    if (Node) {
      Node && Node.addEventListener("click", handleClose)
    } else {
    }
    return () => {
      if (Node) {
        Node.removeEventListener("click", handleClose)
      } else {
      }
    }
  }, [])

  const x = visible ? (
    <div id='dialog-body-content'>
      <Mask className={"mask"} onClick={onClickMask} />
      <Content className={"content"}>{children}</Content>
    </div>
  ) : null
  return ReactDOM.createPortal(x, document.body)
}
Dialog.defaultProps = {
  closeOnClickMask: false,
}

export { Dialog }
interface Props {
  visible: boolean
  onClose: React.MouseEventHandler
  closeOnClickMask?: boolean
  children: ReactElement | ReactNode
}
const Mask = styled.div`
  z-index: 9;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
`
const Content = styled.div`
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 640px;
  height: 296px;
`
