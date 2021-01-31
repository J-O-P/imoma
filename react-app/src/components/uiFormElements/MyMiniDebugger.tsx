import React from "react"
import { useFormikContext } from "formik"

interface Props {}

export const MyMiniDebugger: React.FC<Props> = () => {
  const { values, touched, errors } = useFormikContext()
  return (
    <div>
      <br />
      <pre>values: {JSON.stringify(values, null, 2)}</pre>
      <pre>errors: {JSON.stringify(errors, null, 2)}</pre>
      <pre>touched: {JSON.stringify(touched, null, 2)}</pre>
    </div>
  )
}
