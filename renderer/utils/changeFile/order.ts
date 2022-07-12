import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateOrderMutation,
  DeleteordersMutation,
  OrdersDocument,
  OrdersQuery,
  UpdateOrderMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const order = {
  createOrder: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "orders")
      .forEach((field) => {
        betterUpdateQuery<CreateOrderMutation, OrdersQuery>(
          cache,
          { query: OrdersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createOrder.errors) return query
            query.orders.data = [...query.orders.data, result.createOrder.data]
            return query
          }
        )
      })
  },

  updateOrder: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "orders")
      .forEach((field) => {
        betterUpdateQuery<UpdateOrderMutation, OrdersQuery>(
          cache,
          { query: OrdersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateOrder.errors) return query
            query.orders.data = query.orders.data.map((i) =>
              i.id === result.updateOrder.data.id ? result.updateOrder.data : i
            )
            return query
          }
        )
      })
  },
  deleteorders: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "orders")
      .forEach((field) => {
        betterUpdateQuery<DeleteordersMutation, OrdersQuery>(
          cache,
          { query: OrdersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteorders) return query
            query.orders.data = query.orders.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}
