import { NextPage } from "next"
import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { Information } from "../customer/InformationShow"

interface materialProps {
  data: any
  width: number
  deman: boolean
  change: (da?: any, dx?: number) => void
  onSelect?: (data: any) => void
}

const Material: NextPage<materialProps> = ({
  data,
  width,
  deman,
  change,
  onSelect,
}) => {
  const [left, setLeft] = useState<number>(0)
  const [Wid, setWid] = useState<number>(0)
  const isDrag = useRef<boolean>(false)
  const startPageX = useRef<number>(0)
  const container = useRef<HTMLDivElement>(null)
  const onePxSec = 86400 / width //1px表示多少秒
  const today = new Date(new Date().toLocaleDateString()).getTime()
  useEffect(() => {
    const left = ((data["startDate"] - today) / 86400000) * +width
    setLeft(left)
    setWid(((data["endDate"] - data["startDate"]) / 86400000) * +width)
  }, [])
  const dragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDrag.current = true
    startPageX.current = e.pageX
  }
  const dragEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDrag.current = false
    const offsetLeft = e.currentTarget.offsetLeft
    const x = startPageX.current - offsetLeft

    const newLocation = e.pageX - x

    if (container.current) {
      let el = container.current
      el.style.left = `${newLocation}px`
    }
    const dx = (e.pageX - startPageX.current) * onePxSec * 1000
    const offsetSec = data["endDate"] - data["startDate"]
    data["startDate"] = today + newLocation * onePxSec * 1000
    data["endDate"] = data["startDate"] + offsetSec
    change(data, dx) //更新数据源
  }
  return (
    <Container
      status={deman.toString()} //每更新引起的
      ref={container}
      draggable={true}
      left={left}
      width={Wid}
      tabIndex={-1}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onMouseDown={Information}
      onMouseEnter={() => {
        Information(data)
      }}
      onMouseMove={(e) => {
        Information(data, e)
      }}
      onMouseLeave={() => {
        Information()
      }}
      onClick={() => {
        onSelect(data)
        Information()
      }}
    />
  )
}

export default Material
const Container = styled.div<{ left: number; width: number; status: string }>`
  position: absolute;
  height: 100%;
  width: ${(props) => props.width || 0}px;
  left: ${(props) => props.left || 0}px;
  background-color: rgb(43, 149, 236);
  border: ${(props) =>
    props.status === "true"
      ? css`2px solid red`
      : css`1px solid rgb(19, 116, 196)`};
  box-sizing: border-box;
  z-index: 2;
  opacity: 0.5;
  border-radius: 5px;
  cursor: move;
  :hover {
    border: 2px solid #000000;
  }
`
