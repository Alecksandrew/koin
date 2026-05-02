import  { InputHTMLAttributes, RefObject } from "react";
import { InputVariant, variants } from "./variants";
import { useFormField } from "../FormField/useFormField";


export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className">,
    InputVariant {
        ref?: RefObject<HTMLInputElement | null>;
    }

export function Input ({ inputSize = "medium", ref, ...props }: InputProps) {
    const fieldProps = useFormField(props);

    return (
      <input
        ref={ref}
        className={variants({ inputSize })}
        {...props}
        {...fieldProps}
      />
    );
}