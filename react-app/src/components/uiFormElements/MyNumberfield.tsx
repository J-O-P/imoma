import React from "react"
import {
  MessageBar,
  MessageBarType,
  TextField,
  ITextFieldProps,
} from "@fluentui/react"
import { useField, useFormikContext } from "formik"

type MyNumberfieldProps = { name: string } & ITextFieldProps

export function MyNumberfield(props: MyNumberfieldProps) {
  const [field, meta] = useField(props.name)
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext()

  return (
    <div>
      <TextField
        value={field.value}
        type="number"
        onChange={(ev, data) => {
          if (data) {
            setFieldValue(field.name, Math.round(parseFloat(data) * 100) / 100)
            validateField(field.name)
          }
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
