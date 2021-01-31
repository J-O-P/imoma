import * as yup from "yup"
import { NewActivity } from "./activity.dto"

export const newEmptyActivity = (dueDate: Date): NewActivity => ({
  title: "",
  description: "",
  responsible: "",
  due: dueDate,
  confirmedByUs: false,
  confirmedByGuest: false,
  done: false,
})

export const ActivityValidationSchema = yup.object().shape({
  title: yup.string().required("Erforderlich."),
  responsible: yup.string().required("Erforderlich."),
  description: yup.string().required("Erforderlich."),
  due: yup.date().required("Erforderlich."),
  confirmedByUs: yup.boolean().required("Erforderlich."),
  confirmedByGuest: yup.boolean().required("Erforderlich."),
  done: yup.boolean().required("Erforderlich."),
})

export const ActivitiesValidationSchema = yup.object().shape({
  activities: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Erforderlich."),
      responsible: yup.string().required("Erforderlich."),
      description: yup.string().required("Erforderlich."),
      due: yup.date().required("Erforderlich."),
      confirmedByUs: yup.boolean().required("Erforderlich."),
      confirmedByGuest: yup.boolean().required("Erforderlich."),
      done: yup.boolean().required("Erforderlich."),
    })
  ),
})
