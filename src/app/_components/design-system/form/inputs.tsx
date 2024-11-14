import { Input, Radio, RadioGroup, Select, Textarea } from "@headlessui/react";
import { FormField, FormLabel } from "./components";

export function FormInput({ name, type }: { name: string; type: string }) {
  return <Input className="rounded-lg p-1" name={name} type={type} />;
}

export function FormFileInput({ name }: { name: string }) {
  return <Input className="w-56" name={name} type="file" />;
}

export function FormRadio({ value }: { value: string | number }) {
  return (
    <Radio
      value={value}
      className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-gray-600"
    >
      <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
    </Radio>
  );
}

export function FormRadioGroup({
  items,
  value,
  handleChange,
  reverse = false,
}: {
  items: Array<string | number>;
  value: string;
  handleChange: (v: string) => void;
  reverse?: boolean;
}) {
  return (
    <RadioGroup value={value} onChange={handleChange}>
      {items.map((item, i) => (
        <FormField key={`radio-${i + 1}-${item}`}>
          {reverse ? (
            <>
              <FormRadio value={item} />
              <FormLabel>{item}</FormLabel>
            </>
          ) : (
            <>
              <FormLabel>{item}</FormLabel>
              <FormRadio value={item} />
            </>
          )}
        </FormField>
      ))}
    </RadioGroup>
  );
}
