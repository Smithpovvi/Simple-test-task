import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import "./TextField.css";
import React from "react";

export interface ITextFieldProps<C extends FieldValues>
  extends UseControllerProps<C> {
  style?: React.CSSProperties;
  label?: string;
}

const TextField = <C extends FieldValues>({
  style,
  label,
  ...controller
}: ITextFieldProps<C>) => {
  const {
    field,
    fieldState: { error },
  } = useController(controller);
  return (
    <div className="form-field" style={style}>
      {label?.length && <label>{label}</label>}
      <input {...field} className={error && "error"} />
      {error && <span>{error?.message}</span>}
    </div>
  );
};

export default TextField;
