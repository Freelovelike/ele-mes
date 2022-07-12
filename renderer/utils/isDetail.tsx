import { NextRouter } from "next/router"

export const isDetail = (router: NextRouter): Boolean => {
  return router.query.operation?.includes("detail") ? true : false
}
