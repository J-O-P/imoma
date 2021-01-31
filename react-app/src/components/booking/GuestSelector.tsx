import React, { useState } from "react"
import {
  Stack,
  StackItem,
  Label,
  IconButton,
  DefaultButton,
  Modal,
  TextField,
  ScrollablePane,
  ShimmeredDetailsList,
  PrimaryButton,
  Sticky,
  StickyPositionType,
  IRenderFunction,
  IDetailsHeaderProps,
  DetailsListLayoutMode,
  ScrollbarVisibility,
  ActionButton,
} from "@fluentui/react"
import { handleResponse, ErrorMessageBar } from "../../shared/utilities"
import { baseURL } from "../../shared/baseURL"
import { GuestSelectorItem, NewGuest } from "../../types/guest.dto"
import { FullBooking } from "../../types/full-booking.dto"

export const GuestUnSelector: React.FC<{
  fullBooking: FullBooking
  setFieldValue: (field: string, data: any) => void
}> = ({ fullBooking, setFieldValue }) => {
  return (
    <>
      <ActionButton
        iconProps={{ iconName: "PeopleRepeat" }}
        onClick={(e) => {
          if (
            window.confirm(
              "Wollen Sie wirklich die Verbindung zu den anderen Buchungen lösen?"
            )
          ) {
            console.log(
              "Submitted request to unlink guest from prev. bookings:"
            )
            setFieldValue(
              "initialBookingIdOfGuest",
              fullBooking.booking.bookingId
            )
          }
        }}
        text="Zuordnung zu vorherigen Buchungen lösen"
      >
        Zuordnung zu vorherigen Buchungen lösen
      </ActionButton>
    </>
  )
}

export const GuestSelector: React.FC<{
  fullBooking: FullBooking
  setValues: (selectedData: NewGuest) => void
}> = ({ fullBooking, setValues }) => {
  const [isModalOpen, viewModal] = useState(false)
  const [filteredItems, setFilteredItems] = useState<GuestSelectorItem[]>([])
  const [allItems, setAllItems] = useState<GuestSelectorItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [selectedItem, setSelectedItem] = useState<
    GuestSelectorItem | undefined
  >(undefined)

  const onSubmit = (bookingIdToGetGuestDataFrom: number): void => {
    if (
      window.confirm(
        "Achtung: Die Daten werden vom ausgewählten Gast übernommen."
      )
    ) {
      console.log(
        "Submitted request to get  guest from  bookingId: ",
        bookingIdToGetGuestDataFrom
      )
      fetch(
        `${baseURL}/booking/${fullBooking.booking.mandant}/${fullBooking.booking.apartment}/${bookingIdToGetGuestDataFrom}/guest`
      )
        .then(handleResponse)
        .then((guestdata) => {
          setValues({ ...guestdata, writtenAt: fullBooking.guest?.writtenAt })
        })
        .then(() => viewModal(false))
        .catch((e) => setError(e))
    }
  }

  const onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    setFilteredItems(
      text
        ? allItems.filter(
            (i) =>
              i.fullname.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              i.address.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              i.lastBookingDescription
                .toLowerCase()
                .indexOf(text.toLowerCase()) > -1
          )
        : allItems
    )
  }

  const listColumns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "fullname",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Adresse",
      fieldName: "address",
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
      isMultiline: true,
    },
    {
      key: "column3",
      name: "Letzte Buchung",
      fieldName: "lastBookingDescription",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
  ]

  if (error) {
    return <ErrorMessageBar error={error} />
  }

  return (
    <div>
      <ActionButton
        iconProps={{ iconName: "PeopleRepeat" }}
        disabled={isModalOpen}
        onClick={(e) => {
          fetch(
            `${baseURL}/booking/${fullBooking.booking.mandant}/${fullBooking.booking.apartment}/selector`
          )
            .then(handleResponse)
            .then((data: GuestSelectorItem[]) => {
              const SelectorItemsWithoutMyOwnEntry = data.filter(
                (gsi) =>
                  gsi.initialBookingIdOfGuest !==
                  fullBooking.guest?.initialBookingIdOfGuest
              )
              setAllItems(SelectorItemsWithoutMyOwnEntry)
              setFilteredItems(SelectorItemsWithoutMyOwnEntry)
              setIsLoading(false)
              viewModal(true)
            })
            .catch((e) => setError(e))
        }}
      >
        Gast aus bestehender Buchung übernehmen
      </ActionButton>
      <Modal
        isOpen={isModalOpen}
        isBlocking={true}
        onDismiss={(e) => viewModal(false)}
      >
        <Stack tokens={{ padding: "10px" }}>
          <Stack
            horizontal
            styles={{
              root: {
                width: 800,
              },
            }}
            tokens={{
              childrenGap: 30,
            }}
          >
            <StackItem>
              <Label>Auswahl des Gastes</Label>
            </StackItem>
            <StackItem>
              <TextField label="Suchfilter:" onChange={onFilter} />
            </StackItem>
            <StackItem grow> </StackItem>
            <StackItem>
              <IconButton
                //                styles={iconButtonStyles}
                iconProps={{ iconName: "Cancel" }}
                ariaLabel="Close"
                onClick={(e) => {
                  setSelectedItem(undefined)
                  viewModal(false)
                }}
              />
            </StackItem>
          </Stack>
          <Stack
            styles={{
              root: {
                height: 480,
                width: 800,
                position: "relative",
              },
            }}
            tokens={{ padding: "10px 30px 10px 30px" }}
          >
            <ScrollablePane
              scrollbarVisibility={ScrollbarVisibility.auto}
              data-is-scrollable="true"
            >
              <ShimmeredDetailsList
                items={filteredItems}
                columns={listColumns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={1}
                checkboxVisibility={2}
                enableShimmer={isLoading}
                selectionPreservedOnEmptyClick={true}
                onActiveItemChanged={(item) => {
                  setSelectedItem(item)
                }}
                onItemInvoked={(item) => {
                  setSelectedItem(item)
                  onSubmit(item.lastBookingIdOfGuest)
                }}
                onRenderDetailsHeader={_onRenderDetailsHeader}
              />
            </ScrollablePane>
          </Stack>
          <Stack horizontal reversed tokens={{ childrenGap: 10 }}>
            <StackItem>
              <PrimaryButton
                disabled={!selectedItem}
                onClick={(e) => {
                  viewModal(false)
                  if (selectedItem) {
                    onSubmit(selectedItem.lastBookingIdOfGuest)
                  }
                }}
              >
                Gast auswählen
              </PrimaryButton>
            </StackItem>
            <StackItem>
              <DefaultButton
                onClick={(e) => {
                  setSelectedItem(undefined)
                  viewModal(false)
                }}
              >
                Keine bisherige Buchung (Neuer Gast)
              </DefaultButton>
            </StackItem>
          </Stack>
        </Stack>
      </Modal>
    </div>
  )
}

const _onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
  props,
  defaultRender
) => {
  return props ? (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      {defaultRender!({
        ...props,
      })}
    </Sticky>
  ) : null
}
