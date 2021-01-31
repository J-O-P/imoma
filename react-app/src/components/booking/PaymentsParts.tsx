import React, { useState } from "react"
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
import { Formik, Form } from "formik"
import { baseURL } from "../../shared/baseURL"
import { MyDropdown } from "../uiFormElements/MyDropdown"
import { MyDatePicker } from "../uiFormElements/MyDatePicker"
import { MyCheckbox } from "../uiFormElements/MyCheckbox"
import moment from "moment"
import { Payment, NewPayment } from "../../types/payment.dto"
import { PaymentValidationSchema } from "../../types/payment"
import { Booking } from "../../types/booking.dto"
import { MyNumberfield } from "../uiFormElements/MyNumberfield"
import { MyMultilineTextfield } from "../uiFormElements/MyMultilineTextfield"
import { FullBooking } from "../../types/full-booking.dto"

export const PaymentDisplay: React.FC<{
  payment: Payment
  edit: () => void
}> = ({ payment, edit }) => {
  const editable = true

  return (
    <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
      <StackItem align="center">
        <ActionButton
          disabled={!editable}
          iconProps={{ iconName: "Edit" }}
          onClick={edit}
        >
          Edit
        </ActionButton>
      </StackItem>
      <StackItem align="center" styles={{ root: { width: 200 } }}>
        <Label>{payment.title}</Label>
      </StackItem>
      <StackItem align="center">
        <Label>Betrag</Label>
        <Text block>{payment.amount.toFixed(2)} €</Text>
      </StackItem>
      <StackItem align="center">
        <Label>Fälligkeit</Label>
        <Text block>{formatDate(payment.due)}</Text>
      </StackItem>
      <StackItem align="center">
        <Label>Vereinbarungen</Label>
        <MultilineText content={payment.description} />
      </StackItem>
      <StackItem align="center">
        <Label>Bezahlt?</Label>
        <Text block>
          {payment.paid ? (
            <FontIcon iconName="CheckboxComposite" />
          ) : (
            <FontIcon iconName="Checkbox" />
          )}
        </Text>
      </StackItem>
    </Stack>
  )
}

export const PaymentEditForm: React.FC<{
  payment: Payment | NewPayment
  booking: Booking
  close: () => void
  setFullBooking: (fullBooking: FullBooking) => void
}> = ({ payment, booking, close, setFullBooking }) => {
  const [error, setError] = useState<Error | null>(null)

  payment.due = moment(payment.due).toDate()

  if (error) {
    return <ErrorMessageBar error={error} />
  }
  return (
    <Formik
      initialValues={payment}
      validationSchema={PaymentValidationSchema}
      onSubmit={(data) => {
        console.log("Submitted activitiy data:", data)
        const method = "paymentId" in data ? "PUT" : "POST"
        const body = "paymentId" in data ? data : [data]
        return fetch(
          `${baseURL}/booking/${booking.mandant}/${booking.apartment}/${booking.bookingId}/payment`,
          {
            method: method,
            body: JSON.stringify(body),
            headers: { "content-type": "application/json" },
            //credentials: "same-origin",
          }
        )
          .then(handleResponse)
          .then((updatedFullBooking) => setFullBooking(updatedFullBooking))
          .then(close)
          .catch((e) => setError(e))
      }}
    >
      {({ values, dirty, isSubmitting }) => (
        <Form>
          <Stack horizontal>
            <StackItem>
              <ActionButton
                disabled={isSubmitting || !dirty}
                iconProps={{ iconName: "Save" }}
                type="submit"
              >
                Speichern
              </ActionButton>
            </StackItem>
            <StackItem>
              <ActionButton iconProps={{ iconName: "Cancel" }} onClick={close}>
                Schliessen
              </ActionButton>
            </StackItem>
            {"paymentId" in values ? (
              <StackItem>
                <ActionButton
                  iconProps={{ iconName: "Delete" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Soll diese Zahlung wirklich gelöscht werden?"
                      )
                    ) {
                      return fetch(
                        `${baseURL}/booking/${booking.mandant}/${booking.apartment}/${booking.bookingId}/payment/${values.paymentId}`,
                        {
                          method: "DELETE",
                          //credentials: "same-origin",
                        }
                      )
                        .then(handleResponse)
                        .then((updatedFullBooking) =>
                          setFullBooking(updatedFullBooking)
                        )
                        .then(close)
                        .catch((e) => setError(e))
                    }
                  }}
                >
                  Zahlung löschen
                </ActionButton>
              </StackItem>
            ) : null}
          </Stack>

          <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
            <StackItem styles={{ root: { width: 220 } }}>
              <MyDropdown
                name={`title`}
                label="Art"
                options={[
                  {
                    key: "Anzahlung",
                    text: "Anzahlung",
                  },
                  {
                    key: "Restzahlung",
                    text: "Restzahlung",
                  },
                  {
                    key: "Nachzahlung",
                    text: "Nachzahlung",
                  },
                  {
                    key: "Sonstige (siehe Beschreibung)",
                    text: "Sonstige (siehe Beschreibung)",
                  },
                ]}
              />
            </StackItem>
            <MyNumberfield
              name={`amount`}
              label="Betrag (in €)"
              //mask="9999.99"
            />
            <StackItem styles={{ root: { width: 400 } }}>
              <MyMultilineTextfield
                name={`description`}
                label="Zahlungsweg / Vereinbarungen"
              />
            </StackItem>
            <MyDatePicker
              name={`due`}
              label="Zahlbar bis"
              placeholder="Datum Fälligkeit"
            />
            <Stack
              tokens={{
                childrenGap: 10,
                padding: "20px 0px 10px 0px",
              }}
            >
              <MyCheckbox name={`paid`} label="Zahlung eingetroffen" />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export const PaymentFooterDisplay: React.FC<{ payment: Payment }> = ({
  payment,
}) => {
  return (
    <Stack styles={{ root: { paddingTop: 5, paddingLeft: 40 } }}>
      <Text variant="small" style={{ color: "#979593" }}>
        PaymentId: {payment.paymentId} / Zuletzt geändert am:{" "}
        {formatDate(payment.writtenAt)}
      </Text>
    </Stack>
  )
}
