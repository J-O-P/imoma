import { Booking } from "./booking.dto"
import { Guest, GuestHistory } from "./guest.dto"
import { Activity } from "./activity.dto"
import { Payment } from "./payment.dto"
export interface FullBooking {
  booking: Booking
  guest?: Guest
  guestHistory?: GuestHistory
  activities: Activity[]
  payments: Payment[]
}
