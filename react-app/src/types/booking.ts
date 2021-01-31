import moment from "moment"
import * as yup from "yup"
import { NewBooking } from "./booking.dto"
import { createDateAsUTC2 } from "../shared/DateFormatter"

export const newEmptyBooking: NewBooking = {
  apartment: "AP",
  ci: createDateAsUTC2(moment().startOf("day").add(1, "days").toDate()),
  co: createDateAsUTC2(moment().startOf("day").add(3, "days").toDate()),
  //  ci: moment().startOf("day").add(1, "days").toDate(),
  //  co: moment().startOf("day").add(3, "days").toDate(),
  status: "draft",
  calZoho: false,
  calBookingCom: false,
  calFeratel: false,
  addDaysBefore: 0,
  addDaysAfter: 0,
  taxableOwnUse: false,
  comment: "",
}

//Validation

const minCiDate = moment().startOf("day").toDate()
const maxCiDate = moment().startOf("day").add(2, "years").toDate()
const minCoDate = (ci: Date | undefined): Date => {
  return moment(ci).add(2, "days").toDate()
}
const maxCoDate = (ci: Date | undefined): Date => {
  return moment(ci).add(3, "month").toDate()
}

export const NewBookingValidationSchema = yup.object().shape({
  apartment: yup.string().required("Apartment muss selektiert sein"),
  ci: yup
    .date()
    .required("Erforderlich.")
    .min(minCiDate, "Ausserhalb des erlaubten Bereichs.")
    .max(maxCiDate, "Ausserhalb des erlaubten Bereichs."),
  co: yup
    .date()
    .required("Erforderlich.")
    /*.test("CoAfterCi", "Muss nach dem Check-In sein.", function (d) {
      return +d >= this.parent.ci
    })
    .test("MinCoDate", "Buchung zu kurz.", function (d) {
      return +d >= +minCoDate(this.parent.ci)
    })
    .test("MaxCoDate", "Buchung zu lang.", function (d) {
      return +d <= +maxCoDate(this.parent.ci)
    })*/,
  addDaysBefore: yup
    .number()
    .required("Erforderlich.")
    .min(0, "Ungültiger Wert.")
    .max(2, "Max 2."),
  addDaysAfter: yup
    .number()
    .required("Erforderlich.")
    .min(0, "Ungültiger Wert.")
    .max(2, "Max 2."),
  calZoho: yup.boolean().required("Erforderlich."),
  calBookingCom: yup.boolean().required("Erforderlich."),
  calFeratel: yup.boolean().required("Erforderlich."),
  comment: yup
    .string()
    .when("type", {
      is: "service",
      then: yup
        .string()
        .required("Erforderlich bei Service-Buchung.")
        .min(3, "Erforderlich sind min. 3 Zeichen."),
    })
    .when("type", {
      is: "self",
      then: yup
        .string()
        .required("Erforderlich bei Service-Buchung.")
        .min(3, "Erforderlich sind min. 3 Zeichen."),
    }),
})

export const UpdatedBookingValidationSchema = yup.object().shape({
  apartment: yup.string().required("Apartment muss selektiert sein"),
  ci: yup
    .date()
    .required("Erforderlich.")
    .max(maxCiDate, "Ausserhalb des erlaubten Bereichs."),
  co: yup
    .date()
    .required("Erforderlich.")
    /*.test("CoAfterCi", "Muss nach dem Check-In sein.", function (d) {
      return +d >= this.parent.ci
    })
    .test("MinCoDate", "Buchung zu kurz.", function (d) {
      return +d >= +minCoDate(this.parent.ci)
    })
    .test("MaxCoDate", "Buchung zu lang.", function (d) {
      return +d <= +maxCoDate(this.parent.ci)
    })*/,
  addDaysBefore: yup
    .number()
    .required("Erforderlich.")
    .min(0, "Ungültiger Wert.")
    .max(2, "Max 2."),
  addDaysAfter: yup
    .number()
    .required("Erforderlich.")
    .min(0, "Ungültiger Wert.")
    .max(2, "Max 2."),
  calZoho: yup.boolean().required("Erforderlich."),
  calBookingCom: yup.boolean().required("Erforderlich."),
  calFeratel: yup.boolean().required("Erforderlich."),
  comment: yup
    .string()
    .when("type", {
      is: "service",
      then: yup
        .string()
        .required("Erforderlich bei Service-Buchung.")
        .min(3, "Erforderlich sind min. 3 Zeichen."),
    })
    .when("type", {
      is: "self",
      then: yup
        .string()
        .required("Erforderlich bei Service-Buchung.")
        .min(3, "Erforderlich sind min. 3 Zeichen."),
    }),
})
