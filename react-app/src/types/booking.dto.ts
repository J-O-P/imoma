export type BookingStatus = "draft" | "OK" | "canceled"

export interface Booking {
  mandant: string
  apartment: string
  bookingId: number
  writtenAt: Date
  ci: Date
  co: Date
  status: BookingStatus
  calZoho: boolean
  calBookingCom: boolean
  calFeratel: boolean
  addDaysBefore: number
  addDaysAfter: number
  taxableOwnUse: boolean
  comment?: string
}

export interface NewBooking {
  apartment: string
  ci: Date
  co: Date
  status: BookingStatus
  calZoho: boolean
  calBookingCom: boolean
  calFeratel: boolean
  addDaysBefore: number
  addDaysAfter: number
  taxableOwnUse?: boolean
  comment?: string
}
