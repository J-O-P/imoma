import React, { useState } from "react"
import produce from "immer"
import { FullBooking } from "../../types/full-booking.dto"
import {
  PaymentEditForm,
  PaymentDisplay,
  PaymentFooterDisplay,
} from "./PaymentsParts"
import { newEmptyPayment } from "../../types/payment"
import { ErrorMessageBar } from "../../shared/utilities"
import { Stack, StackItem, ActionButton } from "@fluentui/react"

interface Props {
  fullBooking: FullBooking
  setFullBooking: (fullBooking: FullBooking) => void
}

export const PaymentsComponent: React.FC<Props> = ({
  fullBooking,
  setFullBooking,
}) => {
  const [paymentEdit, setPaymentEdit] = useState<boolean[]>(
    new Array(fullBooking.payments?.length)
  )
  const [paymentAdd, setPaymentAdd] = useState(false)

  const editable = true

  return (
    <Stack>
      {fullBooking.payments ? (
        <>
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <StackItem>
              <ActionButton
                disabled={!editable || paymentAdd}
                iconProps={{ iconName: "Add" }}
                title="Zusätzliche Zahlung"
                onClick={() => setPaymentAdd(true)}
              >
                Zusätzliche (Teil-)Zahlung
              </ActionButton>
            </StackItem>
          </Stack>
          {fullBooking.payments.map((p, index) => (
            <div key={p.paymentId}>
              {paymentEdit[index] ? (
                <PaymentEditForm
                  payment={p}
                  booking={fullBooking.booking}
                  setFullBooking={setFullBooking}
                  close={() => {
                    setPaymentEdit(
                      produce(paymentEdit, (draft) => {
                        draft.splice(index, 1, false)
                      })
                    )
                  }}
                />
              ) : (
                <PaymentDisplay
                  payment={p}
                  edit={() => {
                    setPaymentEdit(
                      produce(paymentEdit, (draft) => {
                        draft.splice(index, 1, true)
                      })
                    )
                  }}
                />
              )}
              <PaymentFooterDisplay payment={p} />
            </div>
          ))}
          {fullBooking.payments.length === 0 && !paymentAdd ? (
            <ErrorMessageBar
              error={
                new Error(
                  "Zahlungen fehlen! (Zahlungen werden durch uns überwacht.)"
                )
              }
            />
          ) : null}
          {paymentAdd ? (
            <PaymentEditForm
              payment={newEmptyPayment(fullBooking.booking.ci)}
              booking={fullBooking.booking}
              setFullBooking={setFullBooking}
              close={() => {
                setPaymentAdd(false)
              }}
            />
          ) : null}
        </>
      ) : null}
    </Stack>
  )
}
