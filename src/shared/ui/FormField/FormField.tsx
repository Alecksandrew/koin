import React, { ReactNode } from "react";
import { FormFieldContext } from "./FormFieldContext";
import { wrapperVariants, labelVariants, hintVariants, errorVariants } from "./variants";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <FormFieldContext.Provider value={{ id, describedBy, invalid: !!error }}>
      <div className={wrapperVariants()}>
        <label htmlFor={id} className={labelVariants()}>{label}</label>
        
        {children}
        
        {hint && <p id={hintId} className={hintVariants()}>{hint}</p>}
        {error && <p id={errorId} role="alert" className={errorVariants()}>{error}</p>}
      </div>
    </FormFieldContext.Provider>
  );
}
