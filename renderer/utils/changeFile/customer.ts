import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables
} from "@urql/exchange-graphcache"
import {
  CreateCustomerMutation,
  CustomersDocument,
  CustomersQuery,
  DeletecustomersMutation,
  UpdateCustomerMutation
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"

export const customer = {
  createCustomer: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "customers")
      .forEach((field) => {
        betterUpdateQuery<CreateCustomerMutation, CustomersQuery>(
          cache,
          { query: CustomersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createCustomer.errors) return query
            query.customers.data = [
              ...query.customers.data,
              result.createCustomer.data,
            ]
            return query
          }
        )
      })
  },
  updateCustomer: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "customers")
      .forEach((field) => {
        betterUpdateQuery<UpdateCustomerMutation, CustomersQuery>(
          cache,
          { query: CustomersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateCustomer.errors) return query
            query.customers.data = query.customers.data.map((i) =>
              i.id === result.updateCustomer.data.id
                ? result.updateCustomer.data
                : i
            )
            return query
          }
        )
      })
  },
  deletecustomers: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "customers")
      .forEach((field) => {
        betterUpdateQuery<DeletecustomersMutation, CustomersQuery>(
          cache,
          { query: CustomersDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletecustomers) return query
            query.customers.data = query.customers.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}
