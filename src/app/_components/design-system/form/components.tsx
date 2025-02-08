import { PropsWithChildren } from "react";
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import Button from "@designsystem/button";
import { ButtonTheme } from "@designsystem/button/themes";

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
  onClick,
  disabled = false,
  theme = "submit",
}: PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  theme?: ButtonTheme;
}>) {
  return (
    <Button disabled={disabled} theme={theme} onClick={onClick}>
      {children}
    </Button>
  );
}

export function FormSubmit({
  text,
  onClick,
  withCancel,
  darkMode = false,
  disabled = false,
  orientation = "end",
}: {
  text: string;
  onClick: () => void;
  withCancel?: boolean;
  darkMode?: boolean;
  disabled?: boolean;
  orientation?: "center" | "end" | "start" | "stretch";
}) {
  const justify =
    orientation === "center"
      ? "justify-center"
      : orientation === "stretch"
        ? "flex-col items-stretch"
        : orientation === "start"
          ? "justify-start"
          : "justify-end";

  return (
    <div className={`flex w-full ${justify} gap-2 p-1`}>
      {withCancel && (
        <FormButton
          onClick={onClick}
          theme={darkMode ? "cancel" : "cancel-light"}
        >
          Cancel
        </FormButton>
      )}
      <FormButton onClick={onClick} disabled={disabled}>
        {text}
      </FormButton>
    </div>
  );
}
