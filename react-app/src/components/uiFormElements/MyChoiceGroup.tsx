import React from "react"
import { useField, useFormikContext } from "formik"
import {
  ChoiceGroup,
  IChoiceGroupProps,
  MessageBar,
  MessageBarType,
} from "@fluentui/react"

type MyChoiceGroupProps = { name: string } & IChoiceGroupProps

export const MyChoiceGroup: React.FC<MyChoiceGroupProps> = (props) => {
  const [field, meta] = useField(props.name)
  const { setFieldValue, setFieldTouched } = useFormikContext()
  return (
    <div>
      <ChoiceGroup
        selectedKey={field.value}
        label={props.label}
        options={props.options}
        onChange={(ev, option) => {
          setFieldValue(field.name, option ? option!.key : null)
        }}
        onBlur={(ev) => {
          setFieldTouched(field.name)
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
