import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateItemMutation,
  DeleteitemsMutation,
  ItemsDocument,
  ItemsQuery,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const Item = {
  createItem: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "items")
      .forEach((field) => {
        betterUpdateQuery<CreateItemMutation, ItemsQuery>(
          cache,
          { query: ItemsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createItem.errors) return query
            query.items.data = [...query.items.data, result.createItem.data]
            return query
          }
        )
      })
  },
  deleteitems: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "items")
      .forEach((field) => {
        betterUpdateQuery<DeleteitemsMutation, ItemsQuery>(
          cache,
          { query: ItemsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteitems) return query
            query.items.data = query.items.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}
