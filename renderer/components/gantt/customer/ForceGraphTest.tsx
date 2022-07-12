import { NextPage } from "next"
import { AllNodes } from "../../../src/generated/graphql"

export const getNodes = (
  operationArr: AllNodes[],
  nodes: nodes,
  links: links,
  operations: {
    name: string
    index: number
  }[],
  buffers: {
    name: string
    index: number
  }[],
  resources: {
    name: string
    index: number
  }[],
  minLevel: number,
  maxLevel: number
) => {
  if (!operationArr) return

  let count = -1
  operationArr.map((operation) => {
    //防止添加相同的操作
    const isExist = operations.find((item) => item.name === operation.operation)
    if (isExist) return

    //跟踪级别
    let level = operation.depth
    if (level < minLevel) minLevel = level
    if (level > maxLevel) maxLevel = level
    count++
    //添加操作节点
    const operationIndex =
      nodes.push({
        id: count,
        level: level,
        name: operation.operation,
        type: operation.kind,
        y: 1000 + count,
        x: 0,
        charge: -200,
      }) - 1
    operations.push({ name: operation.operation, index: operationIndex })

    //为资源和加载链接添加节点
    operation.resources?.map((res) => {
      const backRes = resources.filter((item) => {
        if (item.name === res.name) {
          return item
        }
      })

      if (backRes.length > 0) {
        links.push({
          source: nodes[backRes[0].index],
          target: nodes[operationIndex],
          type: "strokePath",
        })
      } else {
        count++
        const resourceIndex =
          nodes.push({
            id: count,
            level: level,
            name: res.name,
            type: "resource",
            y: 950 + count * 10,
            x: 0,
            charge: 0,
          }) - 1

        resources.push({ name: res.name, index: resourceIndex })
        links.push({
          source: nodes[resourceIndex],
          target: nodes[operationIndex],
          type: "strokePath",
        })
      }
    })
    //为物料和加载链接添加节点
    operation.buffers.map((buf) => {
      let bufLevel = 0
      let producer = parseInt(buf[1]) > 0
      const backBuf = buffers.filter((item) => {
        if (item.name === buf[0]) {
          return item
        }
      })

      if (backBuf.length > 0) {
        if (nodes[backBuf[0].index].level < bufLevel)
          nodes[backBuf[0].index].level = bufLevel
        if (producer)
          links.push({
            source: nodes[operationIndex],
            target: nodes[backBuf[0].index],
            type: "path",
          })
        else
          links.push({
            source: nodes[backBuf[0].index],
            target: nodes[operationIndex],
            type: "path",
          })
      } else {
        producer = parseInt(buf[1]) > 0
        bufLevel = producer ? level - 0.5 : level + 0.5
        if (bufLevel < minLevel) minLevel = bufLevel
        if (bufLevel > maxLevel) maxLevel = bufLevel
        count++
        const bufferIndex =
          nodes.push({
            id: count,
            level: bufLevel,
            name: buf[0] as string,
            type:
              operation.depth === 0 && parseInt(buf[1]) > 0
                ? "product"
                : "buffer",
            y: 1050 + count,
            x: 0,
            charge: -200,
          }) - 1
        buffers.push({ name: buf[0] as string, index: bufferIndex })
        if (producer)
          links.push({
            source: nodes[operationIndex],
            target: nodes[bufferIndex],
            type: "path",
          })
        else
          links.push({
            source: nodes[bufferIndex],
            target: nodes[operationIndex],
            type: "path",
          })
      }
    })
  })
}

export const nodePaint = (
  ctx: CanvasRenderingContext2D,
  color: string,
  type?: string,
  x?: number,
  y?: number
) => {
  ctx.fillStyle = color
  const num =
    type === "operation" || type === "itemSupplier" || type === "distribution"
      ? 0
      : type === "buffer"
      ? 1
      : type === "resource"
      ? 2
      : type === "create"
      ? 3
      : 4
  ;[
    () => {
      ctx.fillRect(x - 7, y - 3, 14, 7)
    },
    () => {
      ctx.beginPath()
      ctx.moveTo(x, y - 4)
      ctx.lineTo(x - 5, y + 5)
      ctx.lineTo(x + 5, y + 5)
      ctx.fill()
    },
    () => {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI, false)
      ctx.fill()
    },
    () => {
      ctx.beginPath()
      ctx.moveTo(x, y - 8)
      ctx.lineTo(x - 4, y)
      ctx.lineTo(x, y + 8)
      ctx.lineTo(x + 4, y)
      ctx.fill()
    },
    () => {
      ctx.beginPath()
      ctx.moveTo(x, y - 6)
      ctx.lineTo(x - 7, y + 7)
      ctx.lineTo(x + 7, y + 7)
      ctx.fill()
    },
  ][num]()
}
export const getColor = (type: string) => {
  switch (type) {
    case "operation":
      return "#1f77b4"
    case "itemSupplier":
      return "#1f77b4"
    case "distribution":
      return "#1f77b4"
    case "buffer":
      return "#2ca02c"
    case "resource":
      return "#ff7c3f"
    case "create":
      return "#eb37b5"
    case "product":
      return "#FF4C4C"
  }
}

const ForceGraphTest: NextPage<ForceGraphTestProps> = () => {
  return <></>
}

export default ForceGraphTest
interface ForceGraphTestProps {}
export type newNode = {
  id: string | number
  x: number
  y: number
  vx?: number
  vy?: number
  fx?: number
  fy?: number
  location: string
  type: string
}
export type nodes = {
  id: number
  x: number
  y: number
  level: number
  type: string
  name: string
  charge: number
}[]
export type links = {
  source: { x: number; y: number }
  target: { x: number; y: number }
  type: string
}[]
