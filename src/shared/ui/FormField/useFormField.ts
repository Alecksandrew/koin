import { useContext } from "react";
import { FormFieldContext } from "./FormFieldContext";

export interface UseFormFieldProps {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
}

export function useFormField(props: UseFormFieldProps) {
  const field = useContext(FormFieldContext);

  return {
    id: field?.id ?? props.id,
    "aria-describedby": field?.describedBy ?? props["aria-describedby"],
    "aria-invalid": field?.invalid ?? props["aria-invalid"],
  };
}
