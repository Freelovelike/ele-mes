import React, { MouseEventHandler, useState } from "react"
import styled from "styled-components"
import { Arrow } from "../Arrow"

export const TH: React.FC<THProps> = ({
  title,
  index,
  onClick,
  status,
  priority,
}) => {
  const [w, setW] = useState(title.length > 4 ? 200 : 100)
  return (
    <Th width={w} onClick={(event) => onClick?.(event)}>
      {title}
      {status && <Arrow status={status} priority={priority} />}
      <SP
        id={`sp${index}`}
        draggable
        onDragEnd={(e) => {
          const Span = document.getElementById(`sp${index}`)
          const Left = Span.getBoundingClientRect().left
          setW(w + e.clientX - (Left - 1))
        }}
      >
        &nbsp;
      </SP>
    </Th>
  )
}
interface THProps {
  title: string
  index: number
  onClick?: MouseEventHandler<HTMLTableHeaderCellElement>
  status?: "0" | "1" | "2"
  priority?: 1 | 2 | 3
}

const Th = styled.th<{ width?: number }>`
  position: relative;
  border-right: 1px solid #ccc;
  padding: 2px;
  width: ${({ width }) => (width ? width : "100px")};
  user-select: none;
  color: #333;
  font-size: 13px;
  box-sizing: border-box;
`
const SP = styled.span`
  position: absolute;
  cursor: col-resize;
  height: 100%;
  right: 0px;
  top: 0px;
  width: 5px;
  &:active {
    width: 3px;
    background-color: #464545;
    height: 880px;
    box-sizing: border-box;
  }
`
export const TD = styled.td`
  min-width: 20px;
  border: 1px solid #ccc;
`
