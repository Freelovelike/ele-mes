import Image from "next/image"
import React, { useState } from "react"
import styled from "styled-components"
import Next from "../../assets/Image/next.svg"

export const ChoiceAction: React.FC<ChoiceActionProps> = ({
  canClick,
  id,
  setAction,
}) => {
  const [open, setOpen] = useState(false)
  const Arr = [
    "改变状态为提议",
    "改变状态为经核准的",
    "改变状态为已确定",
    "改变状态为completed",
    "改变状态为已结束",
  ]
  const Click = () => {
    const BB = document.getElementById(`${id}`)
    BB && BB.focus()
    setOpen(!open)
  }
  return (
    <DIV open={open}>
      <BTN
        tabIndex={-1}
        id={id}
        canClick={canClick}
        onClick={() => {
          {
            canClick ? Click() : null
          }
        }}
      >
        <Con>
          <p>选择动作</p>
          <div style={{ position: "relative", width: "7px", height: "3px" }}>
            <Image src={Next} layout='fill' quality={100} />
          </div>
        </Con>
      </BTN>
      {open ? (
        <Drop>
          <Btns>
            {Arr.map((item, index) => {
              return (
                <Btn
                  key={index}
                  onClick={() => {
                    setAction && setAction(true)
                    setOpen(false)
                  }}
                >
                  {item}
                </Btn>
              )
            })}
          </Btns>
        </Drop>
      ) : null}
    </DIV>
  )
}
interface ChoiceActionProps {
  canClick: boolean
  id?: string
  setAction?: React.Dispatch<React.SetStateAction<boolean>>
}
const DIV = styled.div<{ open: boolean }>`
  position: relative;
`
const BTN = styled.div<{ canClick: boolean }>`
  user-select: none;
  width: 92px;
  height: 30px;
  background: ${({ canClick }) => (canClick ? "#ffffff" : "#eeeeee")};
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  line-height: 16px;
  color: #333333;
  opacity: ${({ canClick }) => (canClick ? 1 : 0.65)};
  cursor: ${({ canClick }) => (canClick ? "pointer" : "not-allowed")};
  &:hover {
    background: ${({ canClick }) => (canClick ? "#e6e6e6" : "#eeeeee")};
    border-color: ${({ canClick }) => (canClick ? "#adadad" : "#cccccc")};
  }
  &:focus {
    background: ${({ canClick }) => (canClick ? "#e6e6e6" : "#eeeeee")};
    border-color: ${({ canClick }) => (canClick ? "#8c8c8c" : "#cccccc")};
    box-shadow: ${({ canClick }) =>
      canClick
        ? `0px 1px 1px rgba(0, 0, 0, 0.08),
      0px 0px 8px rgba(102, 175, 233, 0.6)`
        : ""};
  }
`
const Con = styled.div`
  width: 68px;
  height: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Drop = styled.div`
  position: absolute;
  z-index: 1;
  margin-top: 2px;
  width: 171px;
  height: 135px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.18);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Btns = styled.div`
  width: 169px;
  height: 123px;
  display: flex;
  flex-direction: column;
`
const Btn = styled.div`
  width: 169px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #333333;
  user-select: none;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`
