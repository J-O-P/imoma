import React, { useState } from "react"
import { FullBooking } from "../../types/full-booking.dto"
import { ActionButton } from "@fluentui/react"
import { newEmptyActivity } from "../../types/activity"
import { baseURL } from "../../shared/baseURL"
import { handleResponse, ErrorMessageBar } from "../../shared/utilities"

interface Props {
  fullBooking: FullBooking
  setFullBooking: (fullBooking: FullBooking) => void
}

export const ActivitiesAddStandard: React.FC<Props> = ({
  fullBooking,
  setFullBooking,
}) => {
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    return <ErrorMessageBar error={error} />
  }

  return (
    <ActionButton
      iconProps={{ iconName: "AddNotes" }}
      onClick={() => {
        const aufg1 = newEmptyActivity(fullBooking.booking.ci)
        aufg1.title = "Begrüssung Gäste & Einzug"
        aufg1.responsible = "Norbert"
        const aufg2 = newEmptyActivity(fullBooking.booking.co)
        aufg2.title = "Endreinigung"
        aufg2.responsible = "Silke"
        console.log("Data: " + JSON.stringify([aufg1, aufg2]))
        fetch(
          `${baseURL}/booking/${fullBooking.booking.mandant}/${fullBooking.booking.apartment}/${fullBooking.booking.bookingId}/activity`,
          {
            method: "POST",
            body: JSON.stringify([aufg1, aufg2]),
            headers: { "content-type": "application/json" },
            //credentials: "same-origin",
          }
        )
          .then(handleResponse)
          .then((updatedFullBooking) => setFullBooking(updatedFullBooking))
          .catch((e) => setError(e))
      }}
    >
      Standard Aufgaben anlegen
    </ActionButton>
  )
}
