import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CalendarBucketsDocument,
  CalendarBucketsQuery,
  CreateCalendarAndBucketMutation,
  DeletecalendarBucketsMutation,
  UpdateCalendarBucketMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const calendarBucket = {
  createCalendarAndBucket: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "calendarBuckets")
      .forEach((field) => {
        betterUpdateQuery<
          CreateCalendarAndBucketMutation,
          CalendarBucketsQuery
        >(
          cache,
          { query: CalendarBucketsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createCalendarAndBucket.errors) return query
            query.calendarBuckets.data = [
              ...query.calendarBuckets?.data,
              result.createCalendarAndBucket?.data,
            ]
            return query
          }
        )
      })
  },
  deletecalendarBuckets: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "calendarBuckets")
      .forEach((field) => {
        betterUpdateQuery<DeletecalendarBucketsMutation, CalendarBucketsQuery>(
          cache,
          { query: CalendarBucketsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletecalendarBuckets) return query
            query.calendarBuckets.data = query.calendarBuckets.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
  updateCalendarBucket: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "calendarBuckets")
      .forEach((field) => {
        betterUpdateQuery<UpdateCalendarBucketMutation, CalendarBucketsQuery>(
          cache,
          { query: CalendarBucketsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateCalendarBucket.errors) return query
            query.calendarBuckets.data = query.calendarBuckets.data.map((i) =>
              i.id === result.updateCalendarBucket.data.id
                ? result.updateCalendarBucket.data
                : i
            )
            return query
          }
        )
      })
  },
}
