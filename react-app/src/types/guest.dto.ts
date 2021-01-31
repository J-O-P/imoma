export type GuestSalutation = "Herr" | "Frau" | "Familie" | ""

export interface Guest {
  writtenAt: Date
  initialBookingIdOfGuest: number
  lastname: string
  firstname?: string
  salutation?: GuestSalutation
  channel: string
  paymentsToManage: boolean
  numAdults: number
  numChilds: number
  address?: string
  email?: string
  phone?: string
  mobile?: string
  purpose?: string
  comment?: string
}

export interface NewGuest {
  initialBookingIdOfGuest: number
  lastname: string
  firstname?: string
  salutation?: GuestSalutation
  channel: string
  paymentsToManage: boolean
  numAdults: number
  numChilds: number
  address?: string
  email?: string
  phone?: string
  mobile?: string
  purpose?: string
  comment: string
}

export interface GuestSelectorItem {
  lastBookingIdOfGuest: number
  initialBookingIdOfGuest: number
  fullname: string
  address: string
  lastBookingDescription: string
}

export interface GuestHistory {
  numberOfBookings: number
  bookingDescriptions: string[]
}
