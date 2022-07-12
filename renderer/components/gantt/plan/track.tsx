import moment from "moment"
import { NextPage } from "next"
import React, { ReactNode } from "react"
import styled from "styled-components"

interface trackProps {
  count: number
  width: number
  children?: ReactNode
}

const Track: NextPage<trackProps> = ({ count, width, children }) => {
  return (
    <Container>
      {(() => {
        let nodes = []
        const now = new Date()
        for (let i = 0; i < count; i++) {
          const date = i === 0 ? now.getDate() : now.getDate() + 1
          now.setDate(date)
          const toDay =
            now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
          nodes.push(
            <Orbit width={width} key={i} day={moment(toDay).get("day")}></Orbit>
          )
        }
        return nodes
      })()}
      <>{children}</>
    </Container>
  )
}

export default Track

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  width: fit-content;
`
const Orbit = styled.div<{ width: number; day: number }>`
  width: ${(props) => props.width}px;
  height: 60px;
  background-color: ${(props) => {
    if (props.day === 0 || props.day === 6) {
      return "#ccc"
    }
  }};
  z-index: 0;
`
