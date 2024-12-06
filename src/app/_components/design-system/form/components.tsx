import { PropsWithChildren } from "react";
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import Button, { ButtonTheme } from "@designsystem/button";

export function FormContainer({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-5">{children}</div>;
}

export function FormGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid -translate-x-16 grid-cols-2 gap-6 text-end">
      {children}
    </div>
  );
}

export function FormGroup({
  description,
  label,
  legend,
  name,
}: {
  description: string;
  label: string;
  legend: string;
  name: string;
}) {
  return (
    <Fieldset>
      <Legend>{legend}</Legend>
      <Field>
        <Label>{label}</Label>
        <Description>{description}</Description>
        <Input name={name} type={"text"} />
      </Field>
    </Fieldset>
  );
}

export function FormFieldset({ children }: PropsWithChildren) {
  return <Fieldset className="flex flex-col gap-7">{children}</Fieldset>;
}

export function FormField({
  children,
  row = true,
}: PropsWithChildren<{ row?: boolean }>) {
  return (
    <Field
      className={`flex gap-2 ${row ? "flex-row items-center justify-between" : "items-between flex-col justify-center"}`}
    >
      {children}
    </Field>
  );
}

export function FormLabel({
  children,
  htmlFor,
  light = false,
  extraLight = false,
}: PropsWithChildren<{
  htmlFor: string;
  light?: boolean;
  extraLight?: boolean;
}>) {
  const font = light
    ? "font-light text-lg"
    : extraLight
      ? "font-extralight"
      : "font-semibold";
  return (
    <Label className={font} htmlFor={htmlFor}>
      {children}
    </Label>
  );
}

export function FormSeparator() {
  return (
    <div className="flex w-full justify-center">
      <hr className="w-4/5 border-gray-200" />
    </div>
  );
}

export function FormButton({
  children,
  theme = "submit",
}: PropsWithChildren<{ theme?: ButtonTheme }>) {
  return <Button theme={theme}>{children}</Button>;
}

export function FormSubmit({
  text,
  withCancel,
  darkMode = false,
}: {
  text: string;
  darkMode: boolean;
  withCancel?: boolean;
}) {
  return (
    <div className="flex w-full justify-end gap-2 p-1">
      {withCancel && (
        <FormButton theme={darkMode ? "cancel" : "cancel-light"}>
          Cancel
        </FormButton>
      )}
      <FormButton theme={darkMode ? "submit" : "submit-light"}>
        {text}
      </FormButton>
    </div>
  );
}
