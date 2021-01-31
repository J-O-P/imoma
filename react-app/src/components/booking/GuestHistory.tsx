import React from "react"
import { Text, Stack, StackItem, Label } from "@fluentui/react"
import { GuestHistory } from "../../types/guest.dto"

export const GuestBookingHistory: React.FC<{
  guestHistory: GuestHistory
}> = ({ guestHistory }) => {
  return (
    <>
      <Stack horizontal style={{ marginTop: 10 }} tokens={{ childrenGap: 20 }}>
        <StackItem align="center">
          <Label>Buchungshistorie:</Label>
        </StackItem>
        <StackItem align="center">
          <Text block variant="small">
            Anzahl bisher: {guestHistory.numberOfBookings}
          </Text>
        </StackItem>
        <StackItem align="center">
          <Text block variant="small">
            Letzte Buchungen
          </Text>
          {guestHistory.bookingDescriptions.map((e, i) => (
            <Text key={i} block variant="small">
              - {e}
            </Text>
          ))}
          {guestHistory.numberOfBookings > 4 ? (
            <Text block variant="small">
              . . .
            </Text>
          ) : null}
        </StackItem>
      </Stack>
    </>
  )
}
