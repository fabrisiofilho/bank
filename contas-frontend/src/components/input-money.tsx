import React, { ForwardedRef } from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

type NumericFormatProps = {
  name: string;
  onChange: (value: any) => void;
};

type CustomProps = {};

export const NumericFormatCustom = React.forwardRef<
  ForwardedRef<HTMLInputElement>,
  NumericFormatProps & CustomProps
>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
            onChange(values.value);
        }} 
        valueIsNumericString
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale
        thousandSeparator="."
        prefix="R$ "
        allowNegative={false}
    />
  );
});