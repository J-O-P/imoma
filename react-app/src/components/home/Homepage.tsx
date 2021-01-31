import React from "react"
import { Stack, Text, IStackTokens, IStackStyles } from "@fluentui/react"

interface Props {}

const verticalGapStackTokens: IStackTokens = {
  padding: "10px 10px 10px 30px",
}

const stackStyles: IStackStyles = {
  root: {
    //background: "yellow"
  },
}

export const HomePage: React.FC<Props> = () => {
  return (
    <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
      <Text>This is our Homepage</Text>
    </Stack>
  )
}
