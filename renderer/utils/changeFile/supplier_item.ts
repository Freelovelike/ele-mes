import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateItemSupplierMutation,
  DeleteitemSuppliersMutation,
  ItemSuppliersDocument,
  ItemSuppliersQuery,
  UpdateItemSupplierMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const supplier_item = {
  createItemSupplier: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "itemSuppliers")
      .forEach((field) => {
        betterUpdateQuery<CreateItemSupplierMutation, ItemSuppliersQuery>(
          cache,
          { query: ItemSuppliersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createItemSupplier.errors) return query
            query.itemSuppliers.data = [
              ...query.itemSuppliers.data,
              result.createItemSupplier.data,
            ]
            return query
          }
        )
      })
  },
  updateItemSupplier: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "itemSuppliers")
      .forEach((field) => {
        betterUpdateQuery<UpdateItemSupplierMutation, ItemSuppliersQuery>(
          cache,
          { query: ItemSuppliersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateItemSupplier.errors) return query
            query.itemSuppliers.data = query.itemSuppliers.data.map((i) =>
              i.id === result.updateItemSupplier.data.id
                ? result.updateItemSupplier.data
                : i
            )
            return query
          }
        )
      })
  },
  deleteitemSuppliers: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "itemSuppliers")
      .forEach((field) => {
        betterUpdateQuery<DeleteitemSuppliersMutation, ItemSuppliersQuery>(
          cache,
          { query: ItemSuppliersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deleteitemSuppliers) return query
            query.itemSuppliers.data = query.itemSuppliers.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}
