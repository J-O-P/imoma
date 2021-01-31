import React, { useState } from "react"
import {
  Stack,
  StackItem,
  Label,
  Text,
  FontIcon,
  ActionButton,
} from "@fluentui/react"
import { formatDate } from "../../shared/DateFormatter"
import {
  MultilineText,
  ErrorMessageBar,
  handleResponse,
} from "../../shared/utilities"
import { Formik, Form } from "formik"
import { baseURL } from "../../shared/baseURL"
import { MyDropdown } from "../uiFormElements/MyDropdown"
import { MyMultilineTextfield } from "../uiFormElements/MyMultilineTextfield"
import { MyTextfield } from "../uiFormElements/MyTextfield"
import { Activity, NewActivity } from "../../types/activity.dto"
import { ActivityValidationSchema } from "../../types/activity"
import { MyDatePicker } from "../uiFormElements/MyDatePicker"
import { MyCheckbox } from "../uiFormElements/MyCheckbox"
import moment from "moment"
import { Booking } from "../../types/booking.dto"
import { FullBooking } from "../../types/full-booking.dto"

export const ActivitiesDisplay: React.FC<{
  activity: Activity
  edit: () => void
}> = ({ activity, edit }) => {
  const editable = true
  return (
    <Stack horizontal wrap tokens={{ childrenGap: 20 }}>
      <StackItem align="center">
        <ActionButton
          disabled={!editable}
          onClick={edit}
          iconProps={{ iconName: "Edit" }}
        >
          Edit
        </ActionButton>
      </StackItem>
      <StackItem align="center" styles={{ root: { width: 200 } }}>
        <Label>{activity.title}</Label>
      </StackItem>
      <StackItem styles={{ root: { width: 100 } }}>
        <Label>Wer?</Label>
        <Text block>{activity.responsible}</Text>
      </StackItem>
      <StackItem>
        <Label>Wann?</Label>
        <Text block>{formatDate(activity.due)}</Text>
      </StackItem>
      <StackItem>
        <Label>Infos / Vereinbarungen</Label>
        <MultilineText content={activity.description} />
      </StackItem>
      <StackItem>
        <Label>Status</Label>
        <Text block>
          {activity.confirmedByUs ? (
            <FontIcon iconName="CheckboxComposite" />
          ) : (
            <FontIcon iconName="Checkbox" />
          )}{" "}
          Bestätigt von uns
        </Text>
        <Text block>
          {activity.confirmedByGuest ? (
            <FontIcon iconName="CheckboxComposite" />
          ) : (
            <FontIcon iconName="Checkbox" />
          )}{" "}
          Vereinbart mit Gast
        </Text>
      </StackItem>
      <StackItem>
        <Label>Erledigt?</Label>
        <Text block>
          {activity.done ? (
            <FontIcon iconName="CheckboxComposite" />
          ) : (
            <FontIcon iconName="Checkbox" />
          )}
        </Text>
      </StackItem>
    </Stack>
  )
}

export const ActivityEditForm: React.FC<{
  activity: Activity | NewActivity
  booking: Booking
  close: () => void
  setFullBooking: (fullBooking: FullBooking) => void
}> = ({ activity, booking, close, setFullBooking }) => {
  const [error, setError] = useState<Error | null>(null)

  activity.due = moment(activity.due).toDate()

  if (error) {
    return <ErrorMessageBar error={error} />
  }

  return (
    <Formik
      initialValues={activity}
      validationSchema={ActivityValidationSchema}
      onSubmit={async (data) => {
        console.log("Submitted activity data:", data)
        const method = "activityId" in data ? "PUT" : "POST"
        const body =
          "activityId" in data ? JSON.stringify(data) : JSON.stringify([data])
        fetch(
          `${baseURL}/booking/${booking.mandant}/${booking.apartment}/${booking.bookingId}/activity`,
          {
            method: method,
            body: body,
            headers: { "content-type": "application/json" },
            //credentials: "same-origin",
          }
        )
          .then(handleResponse)
          .then((updatedFullBooking) => setFullBooking(updatedFullBooking))
          .then(close)
          .catch((e) => setError(e))
      }}
    >
      {({ values, dirty, isSubmitting }) => (
        <Form>
          <Stack horizontal>
            <StackItem>
              <ActionButton
                disabled={isSubmitting || !dirty}
                iconProps={{ iconName: "Save" }}
                type="submit"
              >
                Speichern
              </ActionButton>
            </StackItem>
            <StackItem>
              <ActionButton iconProps={{ iconName: "Cancel" }} onClick={close}>
                Schliessen
              </ActionButton>
            </StackItem>
            {"activityId" in values ? (
              <StackItem>
                <ActionButton
                  iconProps={{ iconName: "Delete" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Soll diese Aktivität wirklich gelöscht werden?"
                      )
                    ) {
                      return fetch(
                        `${baseURL}/booking/${booking.mandant}/${booking.apartment}/${booking.bookingId}/activity/${values.activityId}`,
                        {
                          method: "DELETE",
                          //credentials: "same-origin",
                        }
                      )
                        .then(handleResponse)
                        .then((updatedFullBooking) =>
                          setFullBooking(updatedFullBooking)
                        )
                        .then(close)
                        .catch((e) => setError(e))
                    }
                  }}
                >
                  Aktivität löschen
                </ActionButton>
              </StackItem>
            ) : null}
          </Stack>

          <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
            <StackItem styles={{ root: { width: 250 } }}>
              <MyDropdown
                name={`title`}
                label="Aufgabe"
                options={[
                  {
                    key: "Begrüssung Gäste & Einzug",
                    text: "Begrüssung Gäste & Einzug",
                  },
                  {
                    key: "Endreinigung",
                    text: "Endreinigung",
                  },
                  {
                    key: "Zwischenreinigung",
                    text: "Zwischenreinigung",
                  },
                  {
                    key: "Vorbesichtigung",
                    text: "Vorbesichtigung",
                  },
                  {
                    key: "Schlüssel Abholung",
                    text: "Schlüssel Abholung",
                  },
                  {
                    key: "Sonstiges (siehe Beschreibung)",
                    text: "Sonstiges (siehe Beschreibung)",
                  },
                ]}
              />
            </StackItem>
            <MyDatePicker
              name={`due`}
              label="Erforderlich am"
              placeholder="Check-In Datum auswählen"
            />
            <MyTextfield name={`responsible`} label="Verantwortlich" />
            <StackItem>
              <MyCheckbox
                name={`confirmedByUs`}
                label="Bestätigt vom Verantwortlichen"
              />
              <MyCheckbox
                name={`confirmedByGuest`}
                label="Bestätigt vom Gast"
              />
              <MyCheckbox name={`done`} label="Erledigt" />
            </StackItem>
            <StackItem styles={{ root: { width: 500 } }}>
              <MyMultilineTextfield
                name={`description`}
                label="Details / Uhrzeiten / Vereinbarungen"
              />
            </StackItem>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export const ActivityFooterDisplay: React.FC<{
  activity: Activity
}> = ({ activity }) => {
  if (!activity.writtenAt) {
    return null
  }
  return (
    <Stack styles={{ root: { paddingTop: 5, paddingLeft: 40 } }}>
      <Text variant="small" style={{ color: "#979593" }}>
        ActivityId: {activity.activityId} / Zuletzt geändert am:{" "}
        {activity.writtenAt}
      </Text>
    </Stack>
  )
}
