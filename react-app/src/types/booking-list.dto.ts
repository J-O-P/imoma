import { Booking } from "./booking.dto"
import { Guest } from "./guest.dto"

export interface BookingListEntry {
  booking: Booking
  guest?: Guest
  hasActivities: boolean
  hasPayments: boolean
}
