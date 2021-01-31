import React from "react"
import { Stack } from "@fluentui/react"
import * as styles from "../../shared/styles"
import { NewBookingForm } from "./NewBookingForm"

export const NewBookingPage: React.FC<{}> = () => {
  return (
    <Stack
      styles={styles.pageOuterStackStyles}
      tokens={styles.pageOuterStackTokens}
    >
      <NewBookingForm />
    </Stack>
  )
}
