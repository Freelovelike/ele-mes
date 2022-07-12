import { NextComponentType, NextPageContext } from "next"
import Image from "next/image"
import styled from "styled-components"
import CloseSvg from "../assets/Image/GoOut.svg"

export const Drawer: NextComponentType<NextPageContext, {}, DrawerProps> = ({
  children,
  onClosure,
  noNeedClose,
  show = false,
  zIndex = 10,
  isChildren,
}) => {
  return (
    <>
      {show ? (
        <DrawerBox isChildren={isChildren} zIndex={zIndex}>
          {noNeedClose ? null : (
            <Closure onClick={onClosure} zIndex={zIndex}>
              <Image src={CloseSvg} quality={100} width={38} height={38} />
            </Closure>
          )}
          {show && children}
        </DrawerBox>
      ) : null}
    </>
  )
}
interface DrawerBoxProps {
  zIndex?: number
  isChildren?: boolean
}

interface DrawerProps {
  children?: any
  show: boolean
  onClosure: any
  noNeedClose?: boolean
  zIndex?: number
  isChildren?: boolean
}

const DrawerBox = styled.div<DrawerBoxProps>`
  position: absolute;
  width: 50%;
  left: 25%;
  top: 25%;
  height: 50%;
  background: #ffffff;
  box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.15), 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: ${({ isChildren }) => (isChildren ? "0px" : "70px 15px 12px 15px")};
  z-index: ${({ zIndex }) => zIndex || 10};
`

const Closure = styled.div<DrawerBoxProps>`
  position: absolute;
  top: 19.33px;
  right: 15.15px;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: ${({ zIndex }) => zIndex || 10};
  user-select: none;
`
