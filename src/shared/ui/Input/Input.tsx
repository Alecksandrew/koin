import  { InputHTMLAttributes, RefObject } from "react";
import { InputVariant, variants } from "./variants";


export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className">,
    InputVariant {
        ref?: RefObject<HTMLInputElement | null>;
    }

export function Input ({ inputSize = "medium", ref, ...props }: InputProps) {
    return (
      <input
        ref={ref}
        className={variants({ inputSize })}
        {...props}
      />
    );
}