import React from 'react';
import { useFormContext } from 'react-hook-form';
import { pipe, ifElse, invoker, always } from 'ramda';
import { Input } from '@/src/renderer/components/ui/input';

interface NumericInputProps extends React.ComponentProps<typeof Input> {
  name: string; // 由 FormField.name 設定並且自動帶入，這個元件本身不需要設定
  numericType: 'integer' | 'float';
  min?: number;
  max?: number;
  decimalPlaces?: number;
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  (
    {
      name,
      onChange,
      onBlur,
      numericType,
      min,
      max,
      decimalPlaces = 2,
      ...props
    },
    ref,
  ) => {
    const { setValue } = useFormContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (!isNumberFormat(value)) return;

      onChange?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const parsedNumberString = parseNumber({
        value,
        numericType,
        min,
        max,
        decimalPlaces,
      });

      setValue(name, parsedNumberString, { shouldValidate: true });
      onBlur?.(event);
    };

    return (
      <Input
        ref={ref}
        {...props}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
);

NumericInput.displayName = 'NumericInput';

export default NumericInput;

// Utils
export const isNumberFormat = (value: string): boolean =>
  /^(?:0|[1-9]\d*)(?:\.\d*)?$|^$/.test(value);

export const parseNumber = ({
  value,
  numericType,
  min,
  max,
  decimalPlaces,
}: {
  value: string;
  numericType: 'integer' | 'float';
  min?: number;
  max?: number;
  decimalPlaces?: number;
}): string =>
  pipe(
    Number,
    ifElse(
      always(numericType === 'integer'),
      Math.floor,
      invoker(1, 'toFixed')(decimalPlaces),
    ),
    (num: number) => (max && num > max ? max : num),
    (num: number) => (min && num < min ? min : num),
    String,
  )(value);
