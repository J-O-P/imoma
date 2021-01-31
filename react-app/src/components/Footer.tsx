import React from "react"
import { Stack, IStackTokens, Text, IStackStyles } from "@fluentui/react"

interface Props {}

const verticalGapStackTokens: IStackTokens = {
  padding: "10px 10px 10px 30px",
}

const stackStyles: IStackStyles = {
  root: {
    //  background: "green"
  },
}

export const Footer: React.FC<Props> = () => {
  return (
    <Stack styles={stackStyles} tokens={verticalGapStackTokens}>
      <Text>© Copyright 2020 Jens-Ole Petersen</Text>
    </Stack>
  )
}
