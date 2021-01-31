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
import { BookingComponent } from "../booking/BookingComponent"
import { GuestComponent } from "../booking/GuestComponent"
import { ActivitiesComponent } from "../booking/ActivitiesComponent"
import { PaymentsComponent } from "../booking/PaymentsComponent"
//import { formatBookingId } from "../../shared/utilities"
import { BookingDisplay } from "../booking/BookingParts"

interface Props {
  currentBooking: FullBooking
  nextBooking: FullBooking
}

export const HomepageStructure: React.FC<Props> = ({
  currentBooking,
  nextBooking,
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
            <Text variant={"xLarge"}>Home</Text>
          </StackItem>
          <StackItem>
            <Text>imoma.net Ferienwohnung Buchungssystem</Text>
          </StackItem>
        </Stack>
      </Stack>

      {/* 
      <Stack styles={StackStyles} tokens={StackTokens}>
        <Stack>
          <StackItem>
            <Text variant={"large"}>Aktuelle Buchung </Text>
          </StackItem>
        </Stack>
        <BookingDisplay fullBooking={currentBooking} setFullBooking={} />
      </Stack>

      <Stack styles={StackStyles} tokens={StackTokens}>
        <Stack>
          <StackItem>
            <Text variant={"large"}>Nächste Buchung</Text>
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
      
      */}


      <Stack style={{ marginTop: 25 }}>
        <DefaultButton onClick={() => history.goBack()}>Zurück</DefaultButton>
      </Stack>
    </>
  )
}
