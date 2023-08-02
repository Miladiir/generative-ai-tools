import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";

export type TextAreaParams = {
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  onChange?: (newValue: string) => void;
  name?: string;
  form?: string;
  maxLength?: number;
  minLength?: number;
  autoComplete?: "on" | "off";
  placeHolder?: string;
  wrap?: "hard" | "soft" | "off";
};

export function TextArea(params: TextAreaParams) {
  const [value, setValue] = useState(params.defaultValue);
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );
  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      if (
        value !== undefined &&
        value !== "" &&
        !event.shiftKey &&
        event.key === "Enter"
      ) {
        params.onChange?.(value);
        setValue("");
      }
    },
    [params, value, setValue]
  );
  return (
    <textarea
      placeholder={params.placeHolder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="m-0 w-full resize-none"
    />
  );
}
