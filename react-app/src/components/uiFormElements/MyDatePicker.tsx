import React from "react"
import {
  IDatePickerProps,
  DatePicker,
  MessageBar,
  MessageBarType,
  IDatePickerStrings,
} from "@fluentui/react"
import { useField, useFormikContext } from "formik"
import { formatDate, createDateAsUTC } from "../../shared/DateFormatter"

const DayPickerStrings: IDatePickerStrings = {
  months: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ],

  days: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ],

  shortDays: ["S", "M", "D", "M", "D", "F", "S"],

  goToToday: "Heute",
  prevMonthAriaLabel: "Vorheriger Monat",
  nextMonthAriaLabel: "Nächster Monat",
  prevYearAriaLabel: "Vorheriges Jahr",
  nextYearAriaLabel: "Nächstes Jahr",
  closeButtonAriaLabel: "Schliessen",

  isRequiredErrorMessage: "Datum muss eingegeben werden.",
  invalidInputErrorMessage: "Invalid date format.",
}

type MyDatePickerProps = { name: string } & IDatePickerProps

export function MyDatePicker(props: MyDatePickerProps) {
  const [field, meta] = useField(props.name)
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext()

  return (
    <div>
      <DatePicker
        value={field.value}
        onSelectDate={(dat) => {
          setFieldValue(field.name, createDateAsUTC(dat))
          setFieldTouched(field.name, true, false)
          validateField(field.name)
          //Workaround, see: https://github.com/jaredpalmer/formik/issues/2083
        }}
        formatDate={(d) => formatDate(d)}
        strings={DayPickerStrings}
        {...props}
      />
      {meta.touched && meta.error ? (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          messageBarIconProps={{ iconName: "Error" }}
        >
          {props.label ? <span>{props.label}: </span> : null}
          {meta.error}
        </MessageBar>
      ) : null}
    </div>
  )
}
