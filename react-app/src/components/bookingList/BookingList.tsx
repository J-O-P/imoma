import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import {
  Stack,
  StackItem,
  TextField,
  ScrollablePane,
  ScrollbarVisibility,
  ShimmeredDetailsList,
  DetailsListLayoutMode,
  PrimaryButton,
  IRenderFunction,
  IDetailsHeaderProps,
  Sticky,
  StickyPositionType,
  Dropdown,
} from "@fluentui/react"
import { BookingListEntry } from "../../types/booking-list.dto"
import { formatDate } from "../../shared/DateFormatter"
import { baseURL } from "../../shared/baseURL"
import { Toggle } from "@fluentui/react"
import {
  ErrorMessageBar,
  handleResponse,
  formatBookingId,
} from "../../shared/utilities"

interface Props {}

export const BookingList: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)
  const mandant = "PP"
  const [apartment, setApartment] = useState("AP")
  const [allItems, setAllItems] = useState<ListItem[]>([])
  const [filteredItems, setFilteredItems] = useState<ListItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ListItem | undefined>(
    undefined
  )
  const [queryHappens, setQueryHappens] = useState("future")
  const [queryStatus, setQueryStatus] = useState("OK")

  const history = useHistory()

  interface ListItem {
    id: string
    addDaysBefore: number
    ci: string
    co: string
    addDaysAfter: number
    fullname: string
    comment: string
    bookingId: number
  }

  useEffect(() => {
    fetch(
      baseURL +
        "/bookings/" +
        mandant +
        "/" +
        apartment +
        "?happens=" +
        queryHappens +
        "&status=" +
        queryStatus
    )
      .then(handleResponse)
      .then((data) => {
        if (Object.keys(data).length === 0) {
          setAllItems([])
          throw new Error("List of bookings is empty.")
        } else {
          setAllItems(
            data.map((b: BookingListEntry) => ({
              id: formatBookingId(apartment, b.booking.bookingId),
              addDaysBefore: b.booking.addDaysBefore,
              ci: formatDate(new Date(b.booking.ci)),
              co: formatDate(new Date(b.booking.co)),
              addDaysAfter: b.booking.addDaysAfter,
              status: b.booking.status,
              fullname: b.guest
                ? b.guest?.firstname + " " + b.guest?.lastname
                : "",
              comment: b.booking.comment ? b.booking.comment : "",
              bookingId: b.booking.bookingId,
            }))
          )
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [apartment, queryHappens, queryStatus])

  useEffect(() => {
    setFilteredItems(allItems)
  }, [allItems])

  const onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    setFilteredItems(
      text
        ? allItems.filter(
            (i) =>
              i.id.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              i.ci.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              i.co.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              i.fullname.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              i.comment.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
        : allItems
    )
  }

  const openBooking = () =>
    history.push(`/booking/${mandant}/${apartment}/${selectedItem?.bookingId}`)

  const listColumns = [
    {
      key: "id",
      name: "ID",
      fieldName: "id",
      minWidth: 10,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "addDaysBefore",
      name: "+T",
      fieldName: "addDaysBefore",
      minWidth: 10,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "ci",
      name: "Check-In",
      fieldName: "ci",
      minWidth: 10,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "co",
      name: "Check-Out",
      fieldName: "co",
      isResizable: true,
      minWidth: 10,
      maxWidth: 100,
      isMultiline: true,
    },
    {
      key: "addDaysAfter",
      name: "+T",
      fieldName: "addDaysAfter",
      minWidth: 10,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "status",
      name: "Status",
      fieldName: "status",
      minWidth: 10,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "fullname",
      name: "Gast",
      fieldName: "fullname",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "comment",
      name: "Bemerkung",
      fieldName: "comment",
      minWidth: 100,
      isResizable: true,
    },
  ]

  return (
    <Stack
      tokens={{
        padding: "10px",
      }}
    >
      {error ? <ErrorMessageBar error={error} /> : null}
      <Stack
        horizontal
        tokens={{
          childrenGap: 30,
        }}
      >
        <StackItem>
          <Dropdown
            label="Apartment"
            options={[{ key: "AP", text: "FeWo Apland" }]}
            defaultSelectedKey="AP"
            onChange={(ev, selectedItem) => {
              if (selectedItem) {
                setApartment(selectedItem.key.toString())
              }
            }}
          />
        </StackItem>
        <StackItem>
          <Toggle
            label="Vergangene Buchungen"
            onText="Vergangene"
            offText="Zukünftige"
            onChange={(ev, selected) => {
              if (selected) {
                setQueryHappens("past")
              }
              if (!selected) {
                setQueryHappens("future")
              }
            }}
          />
        </StackItem>
        <StackItem>
          <Toggle
            label="Stornierte Buchungen"
            onText="Anzeigen"
            offText="Verbergen"
            onChange={(ev, selected) => {
              if (selected) {
                setQueryStatus("ALL")
              }
              if (!selected) {
                setQueryStatus("OK")
              }
            }}
          />
        </StackItem>
        <StackItem>
          <TextField label="Suchfilter:" onChange={onFilter} />
        </StackItem>
        <StackItem grow> </StackItem>
      </Stack>
      <Stack
        styles={{
          root: {
            height: 800,
            position: "relative",
          },
        }}
        tokens={{
          padding: "10px 30px 10px 30px",
        }}
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
              openBooking()
            }}
            onRenderDetailsHeader={onRenderDetailsHeader}
          />
        </ScrollablePane>
      </Stack>
      <Stack
        horizontal
        reversed
        tokens={{
          childrenGap: 10,
        }}
      >
        <StackItem>
          <PrimaryButton disabled={!selectedItem} onClick={openBooking}>
            Buchung öffnen
          </PrimaryButton>
        </StackItem>
      </Stack>
    </Stack>
  )
}

const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
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
