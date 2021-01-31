import React from "react"
import { Stack } from "@fluentui/react"
import * as styles from "../../shared/styles"
import { BookingList } from "./BookingList"

export const BookingListPage: React.FC<{}> = () => {
  return (
    <Stack
      styles={styles.pageOuterStackStyles}
      tokens={styles.pageOuterStackTokens}
    >
      <BookingList />
    </Stack>
  )
}
