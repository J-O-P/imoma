import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Stack, DefaultPalette } from "@fluentui/react"
import {
  ErrorMessageBar,
  LoadingModalSpinner,
  handleResponse,
} from "../../shared/utilities"
import { baseURL } from "../../shared/baseURL"
import { FullBooking } from "../../types/full-booking.dto"
import { BookingStructure } from "./BookingStructure"

export const DetailsPage: React.FC<{}> = () => {
  let { mandant } = useParams<{ mandant: string }>()
  let { apartment } = useParams<{ apartment: string }>()
  let { bookingId } = useParams<{ bookingId: string }>()
  let [fullBooking, setFullBooking] = useState<FullBooking>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)

  useEffect(() => {
    if (mandant && apartment && bookingId) {
      fetch(`${baseURL}/booking/${mandant}/${apartment}/${bookingId}`)
        .then(handleResponse)
        .then((data) => {
          if (Object.keys(data).length === 0) {
            throw new Error("Booking cannot be found.")
          } else {
            setFullBooking(data)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    } else {
      setError(new Error("Parameter were not provided in URL."))
      setIsLoading(false)
    }
  }, [mandant, apartment, bookingId])

  if (error) {
    return <ErrorMessageBar error={error} />
  }

  if (isLoading) {
    return <LoadingModalSpinner />
  }

  if (!fullBooking) {
    return <ErrorMessageBar error={new Error("Keine Daten gefunden.")} />
  }

  return (
    <Stack
      styles={{
        root: { background: DefaultPalette.white },
      }}
      tokens={{ padding: "10px 30px", childrenGap: 10 }}
    >
      <BookingStructure
        fullBooking={fullBooking}
        setFullBooking={setFullBooking}
      />
    </Stack>
  )
}
