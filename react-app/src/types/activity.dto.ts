export interface Activity {
  activityId: number
  writtenAt: Date
  title: string
  description: string
  responsible: string
  due: Date
  confirmedByUs: boolean
  confirmedByGuest: boolean
  done: boolean
}

export interface NewActivity {
  title: string
  description: string
  responsible: string
  due: Date
  confirmedByUs: boolean
  confirmedByGuest: boolean
  done: boolean
}
