import * as yup from "yup"
import { NewGuest } from "./guest.dto"

export const newEmptyGuest = (bookingId: number): NewGuest => ({
  lastname: "",
  firstname: "",
  salutation: "",
  initialBookingIdOfGuest: bookingId,
  channel: "",
  paymentsToManage: true,
  numAdults: 2,
  numChilds: 0,
  address: "",
  email: "",
  phone: "",
  mobile: "",
  purpose: "",
  comment: "",
})

export const GuestValidationSchema = yup.object().shape({
  salutation: yup.string().notRequired(),
  firstname: yup.string().required("Erforderlich."),
  lastname: yup.string().required("Erforderlich."),
  address: yup.string().required("Erforderlich."),
  channel: yup.string().when("type", {
    is: "guest",
    then: yup.string().required("Erforderlich."),
  }),
  paymentsToManage: yup.boolean().when("type", {
    is: "guest",
    then: yup.boolean().required("Erforderlich."),
  }),

  email: yup
    .string()
    .required("Erforderlich.")
    .email("Ungültige Email Adresse."),
  phone: yup
    .string()
    .test("phoneOrMobile", "Telefon oder Mobile ist nötig.", function (i) {
      return this.parent.phone || this.parent.mobile
    }),
  mobile: yup
    .string()
    .test("phoneOrMobile", "Telefon oder Mobile ist nötig.", function (i) {
      return this.parent.phone || this.parent.mobile
    }),
  numAdults: yup.number().min(1, "Mindestens 1 Erw.").max(4, "Maximal 4 Erw."),
  numChilds: yup.number().min(0, "ungültig").max(4, "Maximal 4 Kinder"),
  purpose: yup.string().notRequired(),
  comment: yup.string().nullable().notRequired(),
})
