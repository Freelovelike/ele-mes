import React from "react"

interface ArrowProps {
  status: "0" | "1" | "2"
  priority?: 1 | 2 | 3
}

export const Arrow: React.FC<ArrowProps> = ({ status, priority }) => {
  return (
    <>
      {status === "0" ? (
        <></>
      ) : status === "1" ? (
        <svg width={20} height={14} viewBox='0 0 20 14'>
          <polygon points='0 6,8 6,4 0' fill='#000' />
          <polygon points='0 8,8 8,4 14' fill='#bbb' />
          <text x='10' y='10'>
            {priority}
          </text>
        </svg>
      ) : (
        <svg width={20} height={14} viewBox='0 0 20 14'>
          <polygon points='0 6,8 6,4 0' fill='#bbb' />
          <polygon points='0 8,8 8,4 14' fill='#000' />
          <text x='10' y='10'>
            {priority}
          </text>
        </svg>
      )}
    </>
  )
}
