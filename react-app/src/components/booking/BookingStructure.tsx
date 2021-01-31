import React from "react"
import { useHistory } from "react-router"
import {
  Stack,
  Text,
  StackItem,
  DefaultButton,
  DefaultPalette,
} from "@fluentui/react"

import { FullBooking } from "../../types/full-booking.dto"
import { BookingComponent } from "./BookingComponent"
import { GuestComponent } from "./GuestComponent"
import { ActivitiesComponent } from "./ActivitiesComponent"
import { PaymentsComponent } from "./PaymentsComponent"
import { formatBookingId } from "../../shared/utilities"

interface Props {
  fullBooking: FullBooking
  setFullBooking: (fullBooking: FullBooking) => void
}

export const BookingStructure: React.FC<Props> = ({
  fullBooking,
  setFullBooking,
}) => {
  const history = useHistory()

  const StackStyles = {
    root: { background: DefaultPalette.neutralLighter },
  }

  const StackTokens = {
    childrenGap: 0,
    padding: "10px 10px 10px 10px",
  }

  return (
    <>
      <Stack styles={StackStyles} tokens={StackTokens}>
        <Stack>
          <StackItem>
            <Text variant={"xLarge"}>
              Buchung{" "}
              {formatBookingId(
                fullBooking.booking.apartment,
                fullBooking.booking.bookingId
              )}
            </Text>
          </StackItem>
          <StackItem>
            <Text>Status: {fullBooking.booking.status}</Text>
          </StackItem>
        </Stack>
      </Stack>

      <Stack styles={StackStyles} tokens={StackTokens}>
        <Stack>
          <StackItem>
            <Text variant={"large"}>Allgemein </Text>
          </StackItem>
        </Stack>
        <BookingComponent
          fullBooking={fullBooking}
          setFullBooking={setFullBooking}
        />
      </Stack>

      <Stack styles={StackStyles} tokens={StackTokens}>
        <Stack>
          <StackItem>
            <Text variant={"large"}>Gast</Text>
          </StackItem>
        </Stack>
        <GuestComponent
          fullBooking={fullBooking}
          setFullBooking={setFullBooking}
        />
      </Stack>

      <Stack styles={StackStyles} tokens={StackTokens}>
        <Stack>
          <StackItem>
            <Text variant={"large"}>Aufgaben</Text>
          </StackItem>
        </Stack>
        <ActivitiesComponent
          fullBooking={fullBooking}
          setFullBooking={setFullBooking}
        />
      </Stack>

      {fullBooking.guest?.paymentsToManage ? (
        <Stack styles={StackStyles} tokens={StackTokens}>
          <Stack>
            <StackItem>
              <Text variant={"large"}>
                Zahlungen (Gesamtbetrag: €{" "}
                {fullBooking.payments
                  .reduce((sum, paym) => sum + paym.amount, 0)
                  .toFixed(2)}
                )
              </Text>
            </StackItem>
          </Stack>
          <PaymentsComponent
            fullBooking={fullBooking}
            setFullBooking={setFullBooking}
          />
        </Stack>
      ) : null}

      <Stack style={{ marginTop: 25 }}>
        <DefaultButton onClick={() => history.goBack()}>Zurück</DefaultButton>
      </Stack>
    </>
  )
}
