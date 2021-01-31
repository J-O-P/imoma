import React, { useState } from "react"
import { FullBooking } from "../../types/full-booking.dto"
import {
  BookingEditForm,
  BookingDisplay,
  BookingFooterDisplay,
} from "./BookingParts"

interface Props {
  fullBooking: FullBooking
  setFullBooking: (fullBooking: FullBooking) => void
}

export const BookingComponent: React.FC<Props> = ({
  fullBooking,
  setFullBooking,
}) => {
  const [bookingEdit, setBookingEdit] = useState(false)

  return (
    <>
      {!bookingEdit ? (
        <BookingDisplay
          booking={fullBooking.booking}
          edit={() => {
            setBookingEdit(true)
          }}
        />
      ) : (
        <BookingEditForm
          booking={fullBooking.booking}
          setFullBooking={setFullBooking}
          close={() => {
            setBookingEdit(false)
          }}
        />
      )}
      <BookingFooterDisplay booking={fullBooking.booking} />
    </>
  )
}
