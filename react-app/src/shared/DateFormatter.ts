const DateFormatter = new Intl.DateTimeFormat("de-CH", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "2-digit",
})

export function formatDate(date: Date | undefined): string {
  if (date === undefined) {
    return ""
  } else return DateFormatter.format(new Date(date))
}

export function createDateAsUTC(
  date: Date | undefined | null
): Date | undefined | null {
  if (date === undefined) {
    return undefined
  }
  if (date === null) {
    return null
  } else
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
}

export function createDateAsUTC2(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

/*
export function parseDate(dateString: string): Date {
  const values = dateString.trim().split(".")
  const defaultDate = new Date()
  const day =
    values.length > 0
      ? Math.max(1, Math.min(31, parseInt(values[0], 10)))
      : defaultDate.getDate()
  const month =
    values.length > 1
      ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1
      : defaultDate.getMonth()
  let year =
    values.length > 2 ? parseInt(values[2], 10) : defaultDate.getFullYear()
  if (year < 100) {
    year += defaultDate.getFullYear() - (defaultDate.getFullYear() % 100)
  }
  console.log(
    "parseDate(): Input: " +
      dateString +
      " Result: Year: " +
      year +
      " Month: " +
      month +
      " Day: " +
      day
  )
  return new Date(year, month, day)
}
*/
