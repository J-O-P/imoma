import React, { Component } from "react"
import {
  MessageBar,
  MessageBarType,
  Modal,
  Stack,
  StackItem,
  Label,
  Spinner,
  SpinnerSize,
  Text,
} from "@fluentui/react"

export const MultilineText: React.FC<{ content: string | undefined }> = ({
  content,
}) => {
  if (content) {
    return (
      <>
        {content.split("\n").map((li, ind) => (
          <Text block key={ind}>
            {li}
          </Text>
        ))}
      </>
    )
  } else {
    return null
  }
}

interface ErrorMessageBarProps {
  error: Error
}
export const ErrorMessageBar: React.FC<ErrorMessageBarProps> = ({ error }) => {
  return (
    <MessageBar
      messageBarType={MessageBarType.error}
      messageBarIconProps={{ iconName: "Error" }}
    >
      {error.message}
    </MessageBar>
  )
}

interface MProps {}
interface MState {
  error: Error | null
}
export class MyErrorBoundary extends Component<MProps, MState> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error: error })
    // You can also log the error to an error reporting service
    console.log("MyErrorHandler():", error, info)
  }
  render() {
    if (this.state.error) {
      return <ErrorMessageBar error={this.state.error} />
    }
    return this.props.children
  }
}

interface LoadingModalSpinnerProps {}
export const LoadingModalSpinner: React.FC<LoadingModalSpinnerProps> = () => {
  return (
    <Modal isOpen={true} isBlocking={true}>
      <Stack tokens={{ padding: "40px 40px 40px 40px", childrenGap: 20 }}>
        <StackItem align="center">
          <Label>Daten werden geladen</Label>
        </StackItem>
        <StackItem align="center">
          <Spinner size={SpinnerSize.large} />
        </StackItem>
      </Stack>
    </Modal>
  )
}

export function handleResponse(response: any) {
  return response.json().then((json: any) => {
    if (response.ok) {
      return json
    } else {
      throw new Error(
        `fetch status: ${response.status} text: ${response.statusText} url: ${response.url} `
      )
      //      return Promise.reject(json)
    }
  })
}

export function formatBookingId(apartment: string, bookingId: number): string {
  return apartment + bookingId.toString().padStart(5, "0")
}

export function paragraphs(content: String): String {
  return (
    "<p>" +
    content
      .replace(/\r?\n([ \t]*\r?\n)+/g, "</p><p>")
      .replace(/\r?\n/g, "<br />") +
    "</p>"
  )
}

export function multlines(content: string | undefined): string | undefined {
  if (content) return content.replace(/\r?\n/g, "<br />")
  else return undefined
}

/*
// Now call the function inside fetch promise resolver
fetch(url)
  .then(CheckError)
  .then((jsonResponse) => {
  }).catch(error) => {
  };
*/
