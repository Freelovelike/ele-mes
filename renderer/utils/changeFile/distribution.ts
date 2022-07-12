import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CreateDistributionMutation,
  DeletedistributionsMutation,
  DistributionsDocument,
  DistributionsQuery,
  UpdateDistributionMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const distribution = {
  createDistribution: (
    result: DataFields,
    _args: Variables,
    cache: Cache,
    _info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "distributions")
      .forEach((field) => {
        betterUpdateQuery<CreateDistributionMutation, DistributionsQuery>(
          cache,
          { query: DistributionsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.createDistribution.data.id) return query
            query.distributions.data = [
              ...query.distributions.data,
              result.createDistribution.data,
            ]
            return query
          }
        )
      })
  },
  updateDistribution: (
    result: DataFields,
    _args: Variables,
    cache: Cache,
    _info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "distributions")
      .forEach((field) => {
        betterUpdateQuery<UpdateDistributionMutation, DistributionsQuery>(
          cache,
          { query: DistributionsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.updateDistribution.data.id) return query
            query.distributions.data = query.distributions.data.map((i) =>
              i.id === result.updateDistribution.data.id
                ? result.updateDistribution.data
                : i
            )
            return query
          }
        )
      })
  },
  deletedistributions: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    _info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "distributions")
      .forEach((field) => {
        betterUpdateQuery<DeletedistributionsMutation, DistributionsQuery>(
          cache,
          { query: DistributionsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletedistributions) return query
            query.distributions.data = query.distributions.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
}
