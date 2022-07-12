import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateSupplierMutation,
  DeletesuppliersMutation,
  SuppliersDocument,
  SuppliersQuery,
  UpdateSupplierMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const supplier = {
  createSupplier: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "suppliers")
      .forEach((field) => {
        betterUpdateQuery<CreateSupplierMutation, SuppliersQuery>(
          cache,
          { query: SuppliersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createSupplier.errors) return query
            query.suppliers.data = [
              ...query.suppliers.data,
              result.createSupplier.data,
            ]
            return query
          }
        )
      })
  },
  updateSupplier: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "suppliers")
      .forEach((field) => {
        betterUpdateQuery<UpdateSupplierMutation, SuppliersQuery>(
          cache,
          { query: SuppliersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateSupplier.errors) return query
            query.suppliers.data = query.suppliers.data.map((i) =>
              i.id === result.updateSupplier.data.id
                ? result.updateSupplier.data
                : i
            )
            return query
          }
        )
      })
  },
  deletesuppliers: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "suppliers")
      .forEach((field) => {
        betterUpdateQuery<DeletesuppliersMutation, SuppliersQuery>(
          cache,
          { query: SuppliersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletesuppliers) return query
            query.suppliers.data = query.suppliers.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}
