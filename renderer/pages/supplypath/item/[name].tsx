import { NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import {
  getColor,
  getNodes,
  links,
  newNode,
  nodePaint,
  nodes,
} from "../../../components/gantt/customer/ForceGraphTest"
import Menu from "../../../components/PagePart/DetailMenu"
import { TD, TH } from "../../../components/PagePart/TH"
import {
  AllNodes,
  useCatchNodeFromItemQuery,
} from "../../../src/generated/graphql"

interface indexProps {}

const index: NextPage<indexProps> = () => {
  const router = useRouter()
  const UnderArr = [
    "层级",
    "操作",
    "对象",
    "优先级",
    "地点",
    "持续时间",
    "每单位的持续时间",
    "生产资料",
  ]
  const name = router.query.name as string
  const [{ data: operationArray }] = useCatchNodeFromItemQuery({
    variables: { itemName: name || "" },
  })

  const [newUnderArr, setArr] = useState<AllNodes[]>([])
  let nodes: nodes = []
  let links: links = []
  let operations: { name: string; index: number }[] = [] //操作节点
  let buffers: { name: string; index: number }[] = [] //物品节点
  let resources: { name: string; index: number }[] = [] //资源节点
  let minLevel = -1
  let maxLevel = 1
  const clientY = useRef<number>(0)
  const onStartDragClientY = useRef<number>(0)
  const onEndClientY = useRef<number>(0)

  const NoSSRForceGraph = dynamic(
    () => import("../../../components/PagePart/NoSSRForceGraph"),
    { ssr: false }
  )
  useEffect(() => {
    const arr: AllNodes[] = JSON.parse(
      operationArray?.catchNodeFromItem ?? "[]"
    ).sort((a: { depth: number }, b: { depth: number }) => a.depth - b.depth)
    if (!arr) return
    let newArr: AllNodes[] = []
    arr.forEach((item) => {
      const check = newArr.every((b) => {
        return item.operation !== b.operation
      })
      check ? newArr.push(item) : null
    })
    setArr(arr)
  }, [operationArray])
  useEffect(() => {
    getNodes(
      newUnderArr,
      nodes,
      links,
      operations,
      buffers,
      resources,
      minLevel,
      maxLevel
    )
  }, [newUnderArr])

  return (
    <PathContainer>
      <div>
        <div className='paddingRole'>
          库存 {"item"} @ {router.query.name || "加载中..."}:供应路径
        </div>
        <Menu
          detailRouterPath='back'
          supplierRouterPath={`/supplypath/item/${router.query.name}`}
        />
      </div>
      <ContainerViewer>
        <div
          id='forceGraph'
          style={{
            width: "100%",
            height: "365px",
            overflow: "hidden",
          }}
        >
          {operationArray ? (
            <NoSSRForceGraph
              width={1920}
              height={500}
              backgroundColor='#ffffff'
              graphData={{ nodes, links }}
              nodeLabel={"id"}
              linkDirectionalArrowLength={3}
              nodeCanvasObject={(node: newNode, ctx) => {
                nodePaint(ctx, getColor(node.type), node.type, node.x, node.y)
                // @ts-ignore
                ctx.fillText(`${node.name}`, node.x, node.y + 10)
                ctx.textAlign = "center"
                ctx.font = "normal 4px sans-serif"
              }}
            />
          ) : (
            "loading..."
          )}
        </div>
        <div className='DataViewer content' id='dataViewer'>
          <div
            className='dragBtn'
            draggable
            onDragStart={(e) => onStart(e, onStartDragClientY)}
            onDragEnd={(e) => onEnd(e, onEndClientY)}
            onDrag={(e) => onMove(e, clientY)}
          >
            <svg width={13} height={13}>
              <line x1={1} y1={3} x2={12} y2={3} stroke='#2c2c2c' />
              <line x1={1} y1={7} x2={12} y2={7} stroke='#2c2c2c' />
              <line x1={1} y1={11} x2={12} y2={11} stroke='#2c2c2c' />
            </svg>
          </div>
        </div>
        <Under>
          <table>
            <thead>
              <tr>
                {UnderArr.map((item, index) => {
                  return <TH title={item} index={index} key={index} />
                })}
              </tr>
            </thead>
            <tbody>
              {newUnderArr &&
                newUnderArr.length > 0 &&
                newUnderArr.map((item, index) => {
                  const obj = item.buffers.find((i) => parseInt(i[1]) > 0)
                  return (
                    <tr key={index}>
                      <TD>{item.depth}</TD>
                      <TD>
                        <P
                          onClick={() => {
                            const opName = item.operation.split(" @ ")[0]
                            router.push({
                              pathname: `../operation/${opName}`,
                            })
                          }}
                        >
                          {item.operation}
                        </P>
                      </TD>
                      <TD>
                        <P
                          onClick={() => {
                            router.push({
                              pathname: `../item/${obj[0]}`,
                            })
                          }}
                        >
                          {obj[0]}
                        </P>
                      </TD>
                      <TD>1</TD>
                      <TD>{item.location}</TD>
                      <TD>{item.duration}</TD>
                      <TD>{item.durationPerUnit}</TD>
                      <TD>
                        {item.resources?.map((item, index) => (
                          <P
                            key={index}
                            onClick={() => {
                              router.push({
                                pathname: `../resource/${item.name}`,
                              })
                            }}
                          >
                            {item.name}
                          </P>
                        ))}
                      </TD>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </Under>
      </ContainerViewer>
    </PathContainer>
  )
}
export const onStart = (
  e: React.DragEvent<HTMLDivElement>,
  onStartDragClientY: React.MutableRefObject<number>
) => {
  onStartDragClientY.current = e.clientY - 107
}
export const onMove = (
  e: React.DragEvent<HTMLDivElement>,
  clientY: React.MutableRefObject<number>
) => {
  e.preventDefault()
  clientY.current = e.clientY - 107
}
export const onEnd = (
  e: React.DragEvent<HTMLDivElement>,
  onEndClientY: React.MutableRefObject<number>
) => {
  const forceGraph = document.getElementById("forceGraph")
  onEndClientY.current = e.clientY - 200
  forceGraph.style.height = `${onEndClientY.current}px`
}

export default index
const ContainerViewer = styled.div`
  position: relative;
  background-color: #ececec;
  height: 100vh;
  overflow: auto;
  .content {
    /* height: 300px; */
    background-color: #fff;
  }
  .dragBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ececec;
    cursor: n-resize;
    user-select: none;
  }
`
export const PathContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  padding: 0px 15px;
  .dragBar {
    width: 98%;
    position: absolute;
    top: 598px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: s-resize;
    border: 1px solid yellow;
  }
  .paddingRole {
    margin: 18px 0px 9px;
  }
  .SVGContent {
    height: 400px;
    background-color: #ffffff;
  }
  .dataContent {
    height: 400px;
    .dataViewer {
      height: 200px;
      border: 1px solid rgba(0, 0, 0, 0.4);
    }
  }
`
export const Under = styled.div`
  height: 336px;
  margin-top: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
  overflow-y: auto;
`
export const P = styled.p`
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #66afe9;
  }
`
