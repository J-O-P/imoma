import React from "react"
import { CommandBar, ICommandBarItemProps } from "@fluentui/react"
import { initializeIcons, Stack } from "@fluentui/react"
import { useHistory } from "react-router"

initializeIcons()
interface Props {}

export const HeaderMenu: React.FC<Props> = () => {
  const history = useHistory()

  const _items: ICommandBarItemProps[] = [
    {
      key: "aktuell",
      text: "Aktuell",
      iconProps: { iconName: "RealEstate" },
      onClick: () => history.push("/home"),
    },
    {
      key: "bookinglist",
      text: "Buchungsliste",
      iconProps: { iconName: "AllApps" },
      onClick: () => history.push("/bookings"),
    },
    {
      key: "newItem",
      text: "Neue Buchung",
      iconProps: { iconName: "Add" },
      onClick: () => history.push("/booking/new"),
    },
    {
      key: "reporting",
      text: "Auswertungen",
      iconProps: { iconName: "TableGroup" },
      onClick: () => history.push("/home"),
    },
    {
      key: "dev",
      text: "Entwicklung",
      iconProps: { iconName: "DeveloperTools" },
      subMenuProps: {
        items: [
          {
            key: "formik",
            text: "Formik Tutorial",
            onClick: () => history.push("/formiktutorial"),
          },
          {
            key: "guest",
            text: "Guest Page",
            onClick: () => history.push("/booking/1/guest"),
          },
          {
            key: "acti",
            text: "Activies Page",
            onClick: () => history.push("/booking/1/activities"),
          },
          {
            key: "paym",
            text: "Payments Page",
            onClick: () => history.push("/booking/1/payments"),
          },
          {
            key: "bgpym",
            text: "Booking Details Page",
            onClick: () => history.push("/booking/1/details"),
          },
          {
            key: "test",
            text: "Test Page",
            onClick: () => history.push("/test"),
          },
          {
            key: "neftest",
            text: "NewEntryF",
            onClick: () => history.push("/newbooking"),
          },
        ],
      },
    },
  ]

  const _farItems: ICommandBarItemProps[] = [
    {
      key: "info",
      text: "Info",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Info",
      iconOnly: true,
      iconProps: { iconName: "Info" },
      onClick: () => console.log("Info"),
    },
  ]

  return (
    <Stack>
      <CommandBar
        items={_items}
        farItems={_farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </Stack>
  )
}
