import React, { useState } from "react"
import { FullBooking } from "../../types/full-booking.dto"
import { GuestDisplay, GuestForm, GuestFooterDisplay } from "./GuestParts"
import { GuestBookingHistory } from "./GuestHistory"
import { Stack, StackItem, ActionButton, Toggle, Label } from "@fluentui/react"
import { baseURL } from "../../shared/baseURL"
import { handleResponse, ErrorMessageBar } from "../../shared/utilities"

interface Props {
  fullBooking: FullBooking
  setFullBooking: (fullBooking: FullBooking) => void
}

export const GuestComponent: React.FC<Props> = ({
  fullBooking,
  setFullBooking,
}) => {
  const [guestEdit, setGuestEdit] = useState(false)
  const [guestAdd, setGuestAdd] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  if (error) {
    return <ErrorMessageBar error={error} />
  }

  return (
    <>
      {fullBooking.guest && !guestEdit ? (
        <GuestDisplay
          fullBooking={fullBooking}
          edit={() => setGuestEdit(true)}
        />
      ) : null}

      {(fullBooking.guest && guestEdit) || (!fullBooking.guest && guestAdd) ? (
        <GuestForm
          fullBooking={fullBooking}
          setFullBooking={setFullBooking}
          close={() => {
            setGuestEdit(false)
            setGuestAdd(false)
          }}
        />
      ) : null}

      {!fullBooking.guest && !guestAdd ? (
        <Stack horizontal wrap tokens={{ childrenGap: 30 }}>
          <StackItem>
            <Label>Kein Gast</Label>
            <ActionButton
              onClick={() => setGuestAdd(true)}
              iconProps={{ iconName: "PeopleAdd" }}
            >
              Gast hinzufügen
            </ActionButton>
          </StackItem>
          <StackItem>
            <Toggle
              label="Steuerpflichtige Eigennutzung?"
              onText="Ja"
              offText="Nein"
              defaultChecked={fullBooking.booking.taxableOwnUse}
              onChange={(e, checked) => {
                console.log("Submitted change of taxableOwnUse:", checked)
                fetch(
                  `${baseURL}/booking/${fullBooking.booking.mandant}/${fullBooking.booking.apartment}/${fullBooking.booking.bookingId}`,
                  {
                    method: "PUT",
                    body: JSON.stringify({
                      taxableOwnUse: checked,
                      writtenAt: fullBooking.booking.writtenAt,
                    }),
                    headers: { "content-type": "application/json" },
                  }
                )
                  .then(handleResponse)
                  .then((updatedFullBooking: any) =>
                    setFullBooking(updatedFullBooking)
                  )
                  .catch((error: Error) => {
                    setError(error)
                  })
              }}
            />
          </StackItem>
        </Stack>
      ) : null}

      {fullBooking.guestHistory ? (
        <GuestBookingHistory guestHistory={fullBooking.guestHistory} />
      ) : null}

      {fullBooking.guest ? (
        <GuestFooterDisplay guest={fullBooking.guest} />
      ) : null}
    </>
  )
}
