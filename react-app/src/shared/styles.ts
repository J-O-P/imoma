import { DefaultPalette } from "@fluentui/react"

//Main stack of pages
export const pageOuterStackStyles = {
  root: { background: DefaultPalette.white },
}
export const pageOuterStackTokens = { padding: "10px 30px" }

//Main stack of editing a single booking
export const bookingDetailStackStyles = {
  root: { background: DefaultPalette.neutralLighter },
}

export const bookingDetailStackTokens = {
  childrenGap: 0,
  padding: "10px 10px 10px 10px",
}
