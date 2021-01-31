import React, { useState } from "react"
import { Stack, StackItem, Label, Text, ActionButton } from "@fluentui/react"
import {
  MultilineText,
  ErrorMessageBar,
  handleResponse,
} from "../../shared/utilities"
import { Formik, Form } from "formik"
import { baseURL } from "../../shared/baseURL"
import { MySlider } from "../uiFormElements/MySlider"
import { MyDropdown } from "../uiFormElements/MyDropdown"
import { MyMultilineTextfield } from "../uiFormElements/MyMultilineTextfield"
import { Guest } from "../../types/guest.dto"
import { GuestValidationSchema, newEmptyGuest } from "../../types/guest"
import { MyTextfield } from "../uiFormElements/MyTextfield"
import { FullBooking } from "../../types/full-booking.dto"
import { MyToggle } from "../uiFormElements/MyToggle"
import { GuestSelector, GuestUnSelector } from "./GuestSelector"
//import { MyMiniDebugger } from "../uiFormElements/MyMiniDebugger"

export const GuestDisplay: React.FC<{
  fullBooking: FullBooking
  edit: () => void
}> = ({ fullBooking, edit }) => {
  return (
    <>
      <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
        <ActionButton onClick={edit} iconProps={{ iconName: "Edit" }}>
          Edit
        </ActionButton>
      </Stack>
      <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
        <StackItem>
          <Label>Name</Label>
          <Text block>Anrede: {fullBooking.guest?.salutation ?? null}</Text>
          <Text block>Vorname: {fullBooking.guest?.firstname}</Text>
          <Text block>Nachname: {fullBooking.guest?.lastname}</Text>,
        </StackItem>
        <StackItem>
          <Label>Aufenthalt</Label>
          <Text block>{fullBooking.guest?.numAdults} Erwachsene</Text>
          <Text block>{fullBooking.guest?.numChilds} Kind(er)</Text>
          <Text block>Grund: {fullBooking.guest?.purpose} </Text>
        </StackItem>
        <StackItem>
          <Label>Buchungskanal</Label>
          <Text block>Kanal: {fullBooking.guest?.channel}</Text>
          {fullBooking.guest?.paymentsToManage ? (
            <Text block>Zahlungen von uns überwacht.</Text>
          ) : (
            <>
              <Text block>Zahlungen via</Text>
              <Text block>Buchungsportal.</Text>
            </>
          )}
        </StackItem>
        <StackItem>
          <Label>Kontakt</Label>
          <Text block>Email: {fullBooking.guest?.email}</Text>
          <Text block>Telefon: {fullBooking.guest?.phone}</Text>
          <Text block>Mobil: {fullBooking.guest?.mobile}</Text>
        </StackItem>
        <StackItem>
          <Label>Adresse</Label>
          <MultilineText content={fullBooking.guest?.address} />
        </StackItem>
        <StackItem>
          <Label>Bemerkungen</Label>
          <MultilineText content={fullBooking.guest?.comment} />
        </StackItem>
      </Stack>
    </>
  )
}

export const GuestForm: React.FC<{
  fullBooking: FullBooking
  setFullBooking: (fullBooking: FullBooking) => void
  close: () => void
}> = ({ fullBooking, close, setFullBooking }) => {
  const [error, setError] = useState<Error | null>(null)
  const initialValues =
    fullBooking.guest || newEmptyGuest(fullBooking.booking.bookingId)

  if (error) {
    return <ErrorMessageBar error={error} />
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={GuestValidationSchema}
      onSubmit={async (formData) => {
        console.log("Submitted guest data:", formData)
        const method =
          "writtenAt" in formData && formData.writtenAt ? "PUT" : "POST"
        console.log("method: ", method)
        fetch(
          `${baseURL}/booking/${fullBooking.booking.mandant}/${fullBooking.booking.apartment}/${fullBooking.booking.bookingId}/guest`,
          {
            method: method,
            body: JSON.stringify(formData),
            headers: { "content-type": "application/json" },
          }
        )
          .then(handleResponse)
          .then((updatedFullBooking) => setFullBooking(updatedFullBooking))
          .then(close)
          .catch((e) => setError(e))
      }}
    >
      {({ isSubmitting, dirty, setValues, setFieldValue }) => {
        return (
          <Form>
            <Stack horizontal wrap tokens={{ childrenGap: 0 }}>
              <ActionButton
                type="submit"
                iconProps={{ iconName: "Save" }}
                disabled={isSubmitting || !dirty}
              >
                Speichern
              </ActionButton>
              <ActionButton onClick={close} iconProps={{ iconName: "Cancel" }}>
                Abbrechen
              </ActionButton>
              {fullBooking.booking.bookingId ===
                fullBooking.guest?.initialBookingIdOfGuest ||
              !fullBooking.guest ? (
                <GuestSelector
                  fullBooking={fullBooking}
                  setValues={setValues}
                />
              ) : (
                <GuestUnSelector
                  fullBooking={fullBooking}
                  setFieldValue={setFieldValue}
                />
              )}
            </Stack>

            <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
              <StackItem>
                <MyDropdown
                  name="salutation"
                  label="Anrede"
                  options={[
                    { key: "", text: "-" },
                    { key: "Herr", text: "Herr" },
                    { key: "Frau", text: "Frau" },
                    { key: "Familie", text: "Familie" },
                  ]}
                />
                <MyTextfield
                  name="firstname"
                  label="Vorname"
                  placeholder="Vorname"
                />
                <MyTextfield
                  name="lastname"
                  label="Name"
                  placeholder="Familienname"
                />
              </StackItem>
              <StackItem>
                <MySlider
                  name="numAdults"
                  label="Anzahl Erwachsene"
                  min={1}
                  max={4}
                  step={1}
                  showValue={true}
                  snapToStep
                />
                <MySlider
                  name="numChilds"
                  label="Anzahl Kinder"
                  min={0}
                  max={4}
                  step={1}
                  showValue={true}
                  snapToStep
                />
              </StackItem>

              <StackItem styles={{ root: { width: 200 } }}>
                <MyDropdown
                  name="channel"
                  label="Buchungskanal"
                  options={[
                    { key: "booking.com", text: "booking.com" },
                    {
                      key: "fewochmgr",
                      text: "FeWoChannelmanager.de",
                    },
                    { key: "airbnb", text: "Airbnb" },
                    {
                      key: "landautourismus",
                      text: "Tourismusbüro Landau",
                    },
                    {
                      key: "direct",
                      text: "Telefon oder Email direkt",
                    },
                  ]}
                  placeholder="Buchungskanal auswählen"
                  onChange2={(item) => {
                    switch (item.key) {
                      case "booking.com":
                        setFieldValue("paymentsToManage", false)
                        break
                      case "fewochmgr":
                        setFieldValue("paymentsToManage", true)
                        break
                      case "airbnb":
                        setFieldValue("paymentsToManage", false)
                        break
                      case "landautourismus":
                        setFieldValue("paymentsToManage", true)
                        break
                      case "direct":
                        setFieldValue("paymentsToManage", true)
                        break
                    }
                  }}
                />
                <MyToggle
                  name="paymentsToManage"
                  label="Zahlungen selbst überwachen?"
                  onText="Ja (Zahlungen selbst überwachen.) "
                  offText="Nein (Buchungsportal stellt Zahlung sicher.)"
                />
              </StackItem>
              <StackItem>
                <MyTextfield name="email" label="E-Mail" placeholder="E-Mail" />
                <MyTextfield
                  name="phone"
                  label="Telefon"
                  placeholder="Telefon Nummer"
                />
                <MyTextfield
                  name="mobile"
                  label="Mobile"
                  placeholder="Handy Nummer"
                />
              </StackItem>
              <StackItem>
                <MyMultilineTextfield
                  name="address"
                  label="Adresse"
                  placeholder="Adresse"
                />
                <MyTextfield
                  name="purpose"
                  placeholder="Grund für die Reise"
                  label="Grund für die Reise"
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
          </Form>
        )
      }}
    </Formik>
  )
}

export const GuestFooterDisplay: React.FC<{ guest: Guest }> = ({ guest }) => {
  return (
    <Stack styles={{ root: { paddingTop: 5 } }}>
      <Text variant="small" style={{ color: "#979593" }}>
        InitialBookingIdOfGuest: {guest.initialBookingIdOfGuest} / Zuletzt
        geändert am: {guest.writtenAt}
      </Text>
    </Stack>
  )
}
