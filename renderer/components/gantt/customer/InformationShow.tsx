import moment from "moment"
import React, { ReactElement, ReactNode } from "react"
import ReactDom from "react-dom"
import ReactDOM from "react-dom/client"
import styled from "styled-components"

const Portal: React.FunctionComponent<Props> = ({ children, data }) => {
  const x = (
    <Content
      className={"content"}
      id='PropContainer'
      onMouseEnter={() => Information(data)}
      onMouseMove={(e) => {
        Information(data, e)
      }}
      onMouseLeave={() => {
        Information()
      }}
    >
      {children}
    </Content>
  )
  return ReactDom.createPortal(x, document.body)
}

export const Information = (
  data?: any,
  e?: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  const bo = document.querySelectorAll("#PropContainer")
  if (!data?.id || !e) {
    bo.forEach((i) => {
      // @ts-ignore
      i.style.display = "none"
    })
  }
  const move = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let locateX = 0
    let locateY = 0
    const viewWidth = document.documentElement.clientWidth
    const viewHeight = document.documentElement.clientHeight
    const mouseXlocation = e.pageX
    const mouseYlocation = e.pageY
    const currentTheight = bo?.[0]?.clientHeight
    const currentTwidth = bo?.[0]?.clientWidth
    const isXend = viewWidth - (mouseXlocation + 30) > currentTwidth
    const isYend = viewHeight - mouseYlocation > currentTheight

    if (isXend) {
      locateX = +mouseXlocation + 30
    } else {
      locateX = +mouseXlocation - 260
    }
    if (isYend) {
      locateY = mouseYlocation
    } else {
      locateY = mouseYlocation - 100
    }
    bo.forEach((node) => {
      // @ts-ignore
      node.style.left = locateX + "px"
      // @ts-ignore
      node.style.top = locateY + "px"
    })
  }

  const close = () => {
    bo.forEach((no) => {
      no.remove()
    })
  }

  if (!data?.id) {
    return close()
  }
  if (e) {
    return move(e)
  }

  const component = (
    <Portal data={data} visible={true}>
      {(() => {
        let nodes: ReactNode[] = []
        for (let i in data) {
          nodes &&
            nodes.push(
              <div key={i}>
                {i}:
                {(() => {
                  if (i.includes("Date") || i.includes("At")) {
                    return moment(+data[i]).format("YYYY-MM-DD hh:mm:ss")
                  }
                  if (typeof data[i] === "object") {
                    return data[i]?.["id"]
                  }
                  return data[i]
                })()}
              </div>
            )
        }
        return nodes
      })()}
    </Portal>
  )
  const div = document.createElement("div")
  const root = ReactDOM.createRoot(div)
  component && root.render(component)
}

interface Props {
  visible: boolean
  children: ReactElement | ReactNode
  data: any
}
const Content = styled.div`
  float: auto;
  position: absolute;
  background-color: #ffffff;
  width: fit-content;
  border: 1px solid #666;
  padding: 5px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 9999;
  user-select: none;
`
