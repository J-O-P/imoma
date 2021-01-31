import React from "react"
import {
  MessageBar,
  MessageBarType,
  TextField,
  ITextFieldProps,
} from "@fluentui/react"
import { useField, useFormikContext } from "formik"

type MyTextfieldProps = { name: string } & ITextFieldProps

export function MyTextfield(props: MyTextfieldProps) {
  const [field, meta] = useField(props.name)
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext()

  return (
    <div>
      <TextField
        value={field.value}
        onChange={(ev, dat) => {
          setFieldValue(field.name, dat)
          validateField(field.name)
        }}
        onBlur={(e) => setFieldTouched(field.name)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          messageBarIconProps={{ iconName: "Error" }}
        >
          {props.label ? <span>{props.label}: </span> : null}
          {meta.error}
        </MessageBar>
      ) : null}
    </div>
  )
}
