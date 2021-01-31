import * as yup from "yup"
import { NewPayment } from "./payment.dto"

export const newEmptyPayment = (dueDate: Date): NewPayment => ({
  title: "",
  amount: 0,
  due: dueDate,
  paid: false,
  description: "",
})

export const PaymentValidationSchema = yup.object().shape({
  title: yup.string().required("Erforderlich."),
  amount: yup
    .number()
    .required("Erforderlich.")
    .moreThan(0, "Muss ein positiver Betrag sein.")
    .lessThan(10000, "Zu gross, nicht plausibel"),
  description: yup.mixed().required("Erforderlich."),
  due: yup.date().required("Erforderlich."),
  paid: yup.boolean().required("Erforderlich."),
})

export const PaymentsValidationSchema = yup.object().shape({
  payments: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Erforderlich."),
      amount: yup
        .number()
        .required("Erforderlich.")
        .moreThan(0, "Muss ein positiver Betrag sein.")
        .lessThan(10000, "Zu gross, nicht plausibel"),
      description: yup.mixed().required("Erforderlich."),
      due: yup.date().required("Erforderlich."),
      paid: yup.boolean().required("Erforderlich."),
    })
  ),
})
