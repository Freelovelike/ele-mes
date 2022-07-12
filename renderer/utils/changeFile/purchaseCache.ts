import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreatePurchaseMutation,
  DeletepurchasesMutation,
  PurchasesDocument,
  PurchasesQuery,
  UpdatePurchaseMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const purchaseCache = {
  createPurchase: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    console.log(cache.inspectFields("Query"))
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "purchases")
      .forEach((field) => {
        betterUpdateQuery<CreatePurchaseMutation, PurchasesQuery>(
          cache,
          { query: PurchasesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createPurchase.errors) return query
            query.purchases.data = [
              ...query.purchases.data,
              result.createPurchase.data,
            ]
            return query
          }
        )
      })
  },
  deletepurchases: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "purchases")
      .forEach((field) => {
        betterUpdateQuery<DeletepurchasesMutation, PurchasesQuery>(
          cache,
          { query: PurchasesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletepurchases) return query
            query.purchases.data = query.purchases.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
  updatePurchase: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "purchases")
      .forEach((field) => {
        betterUpdateQuery<UpdatePurchaseMutation, PurchasesQuery>(
          cache,
          { query: PurchasesDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updatePurchase.errors) return query
            query.purchases.data = query.purchases.data.map((i) =>
              i.id === result.updatePurchase.data.id
                ? result.updatePurchase.data
                : i
            )
            return query
          }
        )
      })
  },
}
