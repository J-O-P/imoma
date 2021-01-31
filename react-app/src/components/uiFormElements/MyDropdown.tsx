import React from "react"
import {
  IDropdownProps,
  Dropdown,
  MessageBar,
  MessageBarType,
  IDropdownOption,
} from "@fluentui/react"
import { useField, useFormikContext } from "formik"

type MyDropdownProps = {
  name: string
  onChange2?: (selectedOption: IDropdownOption) => void
} & IDropdownProps

export function MyDropdown(props: MyDropdownProps) {
  const [field, meta] = useField(props.name)
  const { setFieldValue, validateField, setFieldTouched } = useFormikContext()

  return (
    <>
      <Dropdown
        selectedKey={field.value}
        onChange={(ev, selectedItem) => {
          if (selectedItem && props.onChange2) {
            props.onChange2(selectedItem)
          }
          selectedItem
            ? setFieldValue(field.name, selectedItem.key)
            : setFieldValue(field.name, "")
          // Workaround, see: https://github.com/jaredpalmer/formik/issues/2083
          setFieldTouched(field.name, true, false)
          validateField(field.name)
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
    </>
  )
}
