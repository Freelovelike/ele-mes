import {
  Cache,
  DataFields,
  ResolveInfo,
  Variables,
} from "@urql/exchange-graphcache"
import {
  CalendarsDocument,
  CalendarsQuery,
  CreateCalendarMutation,
  DeletecalendarsMutation,
  UpdateCalendarMutation,
} from "../../src/generated/graphql"
import { betterUpdateQuery } from "../betterUpdateQuery"
export const calendar = {
  createCalendar: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "calendars")
      .forEach((field) => {
        betterUpdateQuery<CreateCalendarMutation, CalendarsQuery>(
          cache,
          { query: CalendarsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.createCalendar.errors) return query
            query.calendars.data = [
              ...query.calendars?.data,
              result.createCalendar?.data,
            ]
            return query
          }
        )
      })
  },
  deletecalendars: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "calendars")
      .forEach((field) => {
        betterUpdateQuery<DeletecalendarsMutation, CalendarsQuery>(
          cache,
          { query: CalendarsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (!result.deletecalendars) return query
            query.calendars.data = query.calendars.data.filter(
              (i) => ![...(args.ids as number[])].includes(i.id)
            )
            return query
          }
        )
      })
  },
  updateCalendar: (
    result: DataFields,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
  ) => {
    cache
      .inspectFields("Query")
      .filter((field) => field.fieldName === "calendars")
      .forEach((field) => {
        betterUpdateQuery<UpdateCalendarMutation, CalendarsQuery>(
          cache,
          { query: CalendarsDocument, variables: field.arguments },
          result,
          (result, query) => {
            if (result.updateCalendar.errors) return query
            query.calendars.data = query.calendars.data.map((i) =>
              i.id === result.updateCalendar.data.id
                ? result.updateCalendar.data
                : i
            )
            return query
          }
        )
      })
  },
}
