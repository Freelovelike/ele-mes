import Router from "next/router"
import { Exchange } from "urql"
import { pipe, tap } from "wonka"
export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(async ({ error, operation }) => {
        if (typeof window !== "undefined") {
          if (error?.message.includes("not authenticated")) {
            return await Router.replace("/login?next=" + Router.pathname)
          }

          if (error?.message.includes("[Network] Failed to fetch")) {
            return Router.replace("/404")
          }
        }
      })
    )
  }
