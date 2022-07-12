interface pProps {
  arr: Array<{
    name: string
    status: "0" | "1" | "2"
  }>
  setArray: any
  name: string
}

export const testFunction = ({ arr, setArray, name }: pProps) => {
  if (!name.trim()) {
    return {}
  }
  return {
    priority: (arr.findIndex((_item) => _item.name === name) + 1) as 1 | 2 | 3,
    status: arr[arr.findIndex((_item) => _item.name === name)]?.status ?? "0",
    onClick: (e) => {
      const Idx = arr.findIndex((cItem) => cItem.name === name)
      if (Idx !== -1) {
        arr[Idx]?.status === "1"
          ? (arr[Idx].status = "2")
          : arr[Idx].status === "2"
          ? arr.splice(Idx, 1)
          : ""
      } else {
        if (arr.length === 3) {
          arr.pop()
        }
        arr.unshift({ name, status: "1" })
      }

      setArray([...arr])
    },
  }
}
