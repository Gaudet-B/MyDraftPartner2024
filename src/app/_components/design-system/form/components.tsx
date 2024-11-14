import { PropsWithChildren } from "react";
import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";

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
  return <Fieldset className="flex flex-col gap-5">{children}</Fieldset>;
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

export function FormLabel({ children }: PropsWithChildren) {
  return <Label className="text-md font-semibold">{children}</Label>;
}
