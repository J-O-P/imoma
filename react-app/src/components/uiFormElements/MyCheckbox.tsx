import React from "react"
import {
  MessageBar,
  MessageBarType,
  ICheckboxProps,
  Checkbox,
} from "@fluentui/react"
import { useField, useFormikContext } from "formik"

type MyCheckboxProps = { name: string } & ICheckboxProps

export function MyCheckbox(props: MyCheckboxProps) {
  const [field, meta] = useField(props.name)
  const { setFieldValue, validateField, setFieldTouched } = useFormikContext()

  return (
    <div>
      <Checkbox
        checked={field.value}
        onChange={(ev, chkd) => {
          setFieldValue(field.name, chkd)
          setFieldTouched(field.name, true, false)
          validateField(field.name)
          //Workaround, see: https://github.com/jaredpalmer/formik/issues/2083
        }}
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
