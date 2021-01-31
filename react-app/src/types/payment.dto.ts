export interface Payment {
  paymentId: number
  writtenAt: Date
  title: string
  amount: number
  due: Date
  paid: boolean
  description: string
}

export interface NewPayment {
  title: string
  amount: number
  due: Date
  paid: boolean
  description: string
}
