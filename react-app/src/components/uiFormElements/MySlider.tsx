import React from "react"
import {
  ISliderProps,
  Slider,
  MessageBar,
  MessageBarType,
} from "@fluentui/react"
import { useField, useFormikContext } from "formik"

type MySliderProps = { name: string } & ISliderProps

export function MySlider(props: MySliderProps) {
  const [field, meta] = useField(props.name)
  const { setFieldValue, validateField, setFieldTouched } = useFormikContext()

  return (
    <div>
      <Slider
        value={field.value}
        onChange={(val) => {
          setFieldValue(field.name, val)
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
