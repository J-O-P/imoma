import React, { useState } from "react"
import moment from "moment"
import { Formik, Form } from "formik"
import { UpdatedBookingValidationSchema } from "../../types/booking"
import { Booking } from "../../types/booking.dto"
import {
  Stack,
  StackItem,
  Label,
  Text,
  FontIcon,
  ActionButton,
} from "@fluentui/react"
import { formatDate } from "../../shared/DateFormatter"
import {
  MultilineText,
  ErrorMessageBar,
  handleResponse,
} from "../../shared/utilities"
import { baseURL } from "../../shared/baseURL"
import { MyDatePicker } from "../uiFormElements/MyDatePicker"
import { MySlider } from "../uiFormElements/MySlider"
import { MyMultilineTextfield } from "../uiFormElements/MyMultilineTextfield"
import { MyCheckbox } from "../uiFormElements/MyCheckbox"
import { FullBooking } from "../../types/full-booking.dto"
import { MyDropdown } from "../uiFormElements/MyDropdown"

export const BookingDisplay: React.FC<{
  booking: Booking
  edit: () => void
}> = ({ booking, edit }) => {
  return (
    <>
      <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
        <ActionButton onClick={edit} iconProps={{ iconName: "Edit" }}>
          Edit
        </ActionButton>
      </Stack>
      <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
        <StackItem>
          <Label>Daten</Label>
          <Text block>Von: {formatDate(booking.ci)}</Text>
          <Text block>Bis: {formatDate(booking.co)}</Text>
          <Text>
            Dauer:{" "}
            {moment
              .duration(moment(booking.co).diff(moment(booking.ci)))
              .asDays()}{" "}
            Tage
          </Text>
        </StackItem>
        <StackItem>
          <Label>Zusätzlich blockierte Tage</Label>
          <Text block>
            Vorher: + {booking.addDaysBefore}{" "}
            {booking.addDaysBefore === 1 ? "Tage" : "Tag"}
          </Text>
          <Text>
            Nachher: + {booking.addDaysAfter}{" "}
            {booking.addDaysAfter === 1 ? "Tage" : "Tag"}
          </Text>
        </StackItem>
        <StackItem>
          <Label>Eingetragen in: </Label>
          <Text block>
            {booking.calZoho ? (
              <FontIcon iconName="CheckboxComposite" />
            ) : (
              <FontIcon iconName="Checkbox" />
            )}{" "}
            Zoho Kalender
          </Text>
          <Text block>
            {booking.calBookingCom ? (
              <FontIcon iconName="CheckboxComposite" />
            ) : (
              <FontIcon iconName="Checkbox" />
            )}{" "}
            booking.com Kalender
          </Text>
          <Text block>
            {booking.calFeratel ? (
              <FontIcon iconName="CheckboxComposite" />
            ) : (
              <FontIcon iconName="Checkbox" />
            )}{" "}
            Feratel Deskline Kalender
          </Text>
        </StackItem>
        <StackItem>
          <Label>Zusätzliche Informationen</Label>
          <MultilineText content={booking.comment} />
        </StackItem>
      </Stack>
    </>
  )
}

export const BookingEditForm: React.FC<{
  booking: Booking
  close: () => void
  setFullBooking: (fullBooking: FullBooking) => void
}> = ({ booking, close, setFullBooking }) => {
  const [error, setError] = useState<Error | undefined>(undefined)
  const minCiDate = moment().startOf("day").toDate()
  const maxCiDate = moment().startOf("day").add(2, "years").toDate()
  const minCoDate = (ci: Date | undefined) => moment(ci).add(2, "days").toDate()
  const maxCoDate = (ci: Date | undefined) =>
    moment(ci).add(3, "month").toDate()

  if (error) {
    return <ErrorMessageBar error={error} />
  }

  return (
    <Formik
      initialValues={{
        ...booking,
        ci: moment(booking.ci).toDate(),
        co: moment(booking.co).toDate(),
      }}
      validationSchema={UpdatedBookingValidationSchema}
      onSubmit={async (formData) => {
        console.log("Submitted booking data:", formData)
        formData.status = "draft"
        fetch(
          `${baseURL}/booking/${booking.mandant}/${booking.apartment}/${booking.bookingId}`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: { "content-type": "application/json" },
          }
        )
          .then(handleResponse)
          .then((updatedFullBooking) => setFullBooking(updatedFullBooking))
          .then(close)
          .catch((error) => {
            setError(error)
          })
      }}
    >
      {({ values, isSubmitting, dirty }) => {
        return (
          <Form>
            <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
              <StackItem align="center">
                <ActionButton
                  type="submit"
                  iconProps={{ iconName: "Save" }}
                  disabled={isSubmitting || !dirty}
                >
                  Speichern
                </ActionButton>
              </StackItem>
              <StackItem align="center">
                <ActionButton
                  onClick={close}
                  iconProps={{ iconName: "Cancel" }}
                >
                  Abbrechen
                </ActionButton>
              </StackItem>

              {/*<ActionButton
                iconProps={{ iconName: "DeleteTable" }}
                onClick={() =>
                  alert("Löschen der ganzen Buchung, NOCH NICHT IMPLEMENTIERT")
                }
                disabled={isSubmitting || dirty}
              >
                Buchung Stornieren
              </ActionButton> */}
              <StackItem align="center">
                <Label>Status</Label>
              </StackItem>
              <StackItem align="center" styles={{ root: { width: 80 } }}>
                <MyDropdown
                  name="status"
                  options={[
                    { key: "OK", text: "OK" },
                    {
                      key: "canceled",
                      text: "canceled",
                    },
                  ]}
                />
              </StackItem>
            </Stack>
            <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
              <StackItem>
                <Label>Daten</Label>
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
                <Text>
                  Dauer:{" "}
                  {values.ci && values.co
                    ? moment
                        .duration(moment(values.co).diff(moment(values.ci)))
                        .asDays()
                    : null}
                  {values.ci && values.co ? <span> Tage</span> : null}
                </Text>
              </StackItem>
              <StackItem>
                <Label>Zusätzlich blockierte Tage</Label>
                <MySlider
                  name="addDaysBefore"
                  label="Vorher"
                  min={0}
                  max={2}
                  step={1}
                  showValue={true}
                  snapToStep
                />
                <MySlider
                  name="addDaysAfter"
                  label="Nacher"
                  min={0}
                  max={2}
                  step={1}
                  showValue={true}
                  snapToStep
                />
              </StackItem>
              <StackItem>
                <Label>Eingetragen in?</Label>
                <MyCheckbox name={`calZoho`} label="Zoho Kalender" />
                <MyCheckbox
                  name={`calBookingCom`}
                  label="booking.com Kalender"
                />
                <MyCheckbox
                  name={`calFeratel`}
                  label="Feratel Deskline Kalender"
                />
              </StackItem>
              <StackItem styles={{ root: { width: 300 } }}>
                <Label>Zusätzliche Informationen</Label>
                <MyMultilineTextfield name="comment" placeholder="Notizen" />
              </StackItem>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}

export const BookingFooterDisplay: React.FC<{ booking: Booking }> = ({
  booking,
}) => {
  return (
    <Stack styles={{ root: { paddingTop: 5 } }}>
      <Text variant="small" style={{ color: "#979593" }}>
        Zuletzt geändert am: {booking.writtenAt}
      </Text>
    </Stack>
  )
}
