import React, { useState } from "react"
import { FullBooking } from "../../types/full-booking.dto"
import produce from "immer"
import {
  ActivitiesDisplay,
  ActivityEditForm,
  ActivityFooterDisplay,
} from "./ActivitiesParts"
import { newEmptyActivity } from "../../types/activity"
import { Stack, StackItem, ActionButton } from "@fluentui/react"
import { ActivitiesAddStandard } from "./ActivitiesAddStandard"

interface Props {
  fullBooking: FullBooking
  setFullBooking: (fullBooking: FullBooking) => void
}

export const ActivitiesComponent: React.FC<Props> = ({
  fullBooking,
  setFullBooking,
}) => {
  const [activityEdit, setActivityEdit] = useState<boolean[]>(
    new Array(fullBooking.activities?.length)
  )
  const [activityAdd, setActivityAdd] = useState(false)
  const editable = true

  return (
    <>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <StackItem>
          <ActionButton
            disabled={!editable || activityAdd}
            iconProps={{ iconName: "Add" }}
            onClick={() => {
              setActivityAdd(true)
            }}
          >
            Aufgabe erstellen
          </ActionButton>
          {fullBooking.activities.length === 0 ? (
            <ActivitiesAddStandard
              fullBooking={fullBooking}
              setFullBooking={setFullBooking}
            />
          ) : null}
        </StackItem>
      </Stack>
      {fullBooking.activities.map((a, index) => {
        return (
          <div key={a.activityId}>
            {activityEdit[index] ? (
              <ActivityEditForm
                activity={a}
                booking={fullBooking.booking}
                setFullBooking={setFullBooking}
                close={() => {
                  setActivityEdit(
                    produce(activityEdit, (draft) => {
                      draft.splice(index, 1, false)
                    })
                  )
                }}
              />
            ) : (
              <ActivitiesDisplay
                activity={a}
                edit={() => {
                  setActivityEdit(
                    produce(activityEdit, (draft) => {
                      draft.splice(index, 1, true)
                    })
                  )
                }}
              />
            )}
            <ActivityFooterDisplay activity={a} />
          </div>
        )
      })}
      {activityAdd ? (
        <ActivityEditForm
          activity={newEmptyActivity(fullBooking.booking.ci)}
          booking={fullBooking.booking}
          setFullBooking={setFullBooking}
          close={() => {
            setActivityAdd(false)
          }}
        />
      ) : null}
    </>
  )
}
