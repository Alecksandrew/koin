import { createContext } from "react";

export interface FormFieldContextValue {
  id: string;
  describedBy?: string;
  invalid: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);
