import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateInventoryMutation,
  DeleteinventorysMutation,
  InventorysDocument,
  InventorysQuery,
  UpdateInventoryMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const inventory = {
  createInventory: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "inventorys")
      .forEach((field) => {
        betterUpdateQuery<CreateInventoryMutation, InventorysQuery>(
          cache,
          { query: InventorysDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createInventory.errors) return query
            query.inventorys.data = [
              ...query.inventorys.data,
              result.createInventory.data,
            ]
            return query
          }
        )
      })
  },
  updateInventory: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "inventorys")
      .forEach((field) => {
        betterUpdateQuery<UpdateInventoryMutation, InventorysQuery>(
          cache,
          { query: InventorysDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateInventory.errors) return query
            query.inventorys.data = query.inventorys.data.map((i) =>
              i.id === result.updateInventory.data.id
                ? result.updateInventory.data
                : i
            )
            return query
          }
        )
      })
  },

  deleteinventorys: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "inventorys")
      .forEach((field) => {
        betterUpdateQuery<DeleteinventorysMutation, InventorysQuery>(
          cache,
          { query: InventorysDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteinventorys) return query
            query.inventorys.data = query.inventorys.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}
