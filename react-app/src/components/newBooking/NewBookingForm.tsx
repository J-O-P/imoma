import React, { useState } from "react"
import { useHistory } from "react-router"
import { Formik, Form } from "formik"
import moment from "moment"
import {
  Stack,
  DefaultButton,
  DefaultPalette,
  Label,
  StackItem,
} from "@fluentui/react"
import { MySlider } from "../uiFormElements/MySlider"
import { MyDatePicker } from "../uiFormElements/MyDatePicker"
import { MyMultilineTextfield } from "../uiFormElements/MyMultilineTextfield"
import {
  newEmptyBooking,
  NewBookingValidationSchema,
} from "../../types/booking"
//import { MyMiniDebugger } from "../uiFormElements/MyMiniDebugger"
import { baseURL } from "../../shared/baseURL"
import { handleResponse, ErrorMessageBar } from "../../shared/utilities"
import { MyDropdown } from "../uiFormElements/MyDropdown"

// Validiation Definitions and Schema
const minCiDate = moment().startOf("day").toDate()
const maxCiDate = moment().startOf("day").add(2, "years").toDate()
const minCoDate = (ci: Date | undefined) => {
  return moment(ci).add(2, "days").toDate()
}
const maxCoDate = (ci: Date | undefined) => {
  return moment(ci).add(3, "month").toDate()
}

export const NewBookingForm: React.FC<{}> = () => {
  const [error, setError] = useState<Error | null>(null)
  const history = useHistory()

  const mandant = "PP"
  if (error) {
    return <ErrorMessageBar error={error} />
  }

  return (
    <Formik
      initialValues={newEmptyBooking}
      validationSchema={NewBookingValidationSchema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        data.status = "OK"
        console.log("Submit data for new booking:", data)
        fetch(`${baseURL}/booking/${mandant}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
          //credentials: "same-origin",
        })
          .then(handleResponse)
          .then((createdFullBooking) =>
            history.push(
              `/booking/${mandant}/${data.apartment}/${createdFullBooking.booking.bookingId}`
            )
          )
          .catch((e) => setError(e))
      }}
    >
      {({ values, isSubmitting, setFieldValue, errors, touched }) => {
        return (
          <Form>
            <Stack
              horizontal
              wrap
              styles={{ root: { background: DefaultPalette.neutralLighter } }}
              tokens={{ childrenGap: 10 }}
            >
              <StackItem>
                <MyDropdown
                  name="apartment"
                  label="Apartment"
                  options={[{ key: "AP", text: "FeWo Apland" }]}
                  placeholder="Apartment auswählen"
                />
              </StackItem>
              <StackItem>
                <MyDatePicker
                  name="ci"
                  label="Check-In"
                  placeholder="Check-In Datum auswählen"
                  minDate={minCiDate}
                  maxDate={maxCiDate}
                />
                <MyDatePicker
                  name="co"
                  label="Check-Out"
                  placeholder="Check-Out Datum auswählen"
                  initialPickerDate={minCoDate(values.ci)}
                  minDate={minCoDate(values.ci)}
                  maxDate={maxCoDate(values.ci)}
                />
                <Label>
                  Dauer des Aufenthalts:{" "}
                  {values.ci && values.co
                    ? moment
                        .duration(moment(values.co).diff(moment(values.ci)))
                        .asDays()
                    : null}
                  {values.ci && values.co ? <span> Tage</span> : null}
                </Label>
              </StackItem>
              <StackItem>
                <Label>Zusätzlich blockierte Tage</Label>
                <MySlider
                  name="addDaysBefore"
                  label="Vorher"
                  min={0}
                  max={3}
                  step={1}
                  showValue={true}
                  snapToStep
                />
                <MySlider
                  name="addDaysAfter"
                  label="Nacher"
                  min={0}
                  max={3}
                  step={1}
                  showValue={true}
                  snapToStep
                />
              </StackItem>
              <StackItem>
                <MyMultilineTextfield
                  name="comment"
                  placeholder="Notizen"
                  label="Bemerkungen"
                />
              </StackItem>
            </Stack>
            <Stack
              styles={{ root: { background: DefaultPalette.neutralLighter } }}
            >
              <StackItem>
                <DefaultButton
                  disabled={isSubmitting}
                  text="Buchung anlegen"
                  type="submit"
                />
              </StackItem>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}
