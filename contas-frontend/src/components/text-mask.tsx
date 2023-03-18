import { IMaskInput } from "react-imask";
import { ForwardedRef, forwardRef, RefObject } from 'react';

export interface CustomProps {
    name: string;
    onChange: (value: any) => void;
}

export const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props: CustomProps, ref: ForwardedRef<HTMLElement>) {
    const { name, onChange, ...other} = props;
    return (
      <IMaskInput
        {...other}
        mask={name=='cpf' ? '000.000.000-00': '0000000-0'}
        definitions={{
          '#': /[1-9]/
        }}
        onAccept={(value) =>
            onChange(value)
        }
        inputRef={ref as RefObject<HTMLInputElement>}
        overwrite
      />
    );
  }
);