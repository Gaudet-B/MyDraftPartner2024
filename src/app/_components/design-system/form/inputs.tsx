import {
  Input,
  Label,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@headlessui/react";
import { FormField, FormLabel } from "./components";

export function FormInput({ name, type }: { name: string; type: string }) {
  return <Input className="rounded-lg p-1" name={name} type={type} />;
}

export function FormFileInput({ name }: { name: string }) {
  return <Input className="w-60" name={name} type="file" />;
}

export function FormRadio({
  darkMode,
  value,
}: {
  darkMode: boolean;
  value: string | number;
}) {
  return (
    <Radio
      value={value}
      className={`group flex size-5 items-center justify-center rounded-full border ${darkMode ? "bg-gray-800 data-[checked]:bg-gray-300" : "bg-white data-[checked]:bg-gray-600"}`}
    >
      <span
        className={`invisible size-2 rounded-full ${darkMode ? "bg-gray-800 group-data-[checked]:visible" : "bg-white group-data-[checked]:visible"}`}
      />
    </Radio>
  );
}

export function FormRadioGroup({
  darkMode,
  items,
  value,
  handleChange,
  light = false,
  reverse = false,
}: {
  darkMode: boolean;
  items: Array<string | number>;
  value: string;
  handleChange: (v: string) => void;
  light?: boolean;
  reverse?: boolean;
}) {
  return (
    <RadioGroup value={value} onChange={handleChange}>
      {items.map((item, i) => (
        <div
          key={`radio-${i + 1}-${item}`}
          className={`flex gap-2 ${darkMode ? "text-gray-100" : ""}`}
        >
          {reverse ? (
            <>
              <FormRadio value={item} darkMode={darkMode} />
              <FormLabel extraLight={light}>{item}</FormLabel>
            </>
          ) : (
            <>
              <FormLabel extraLight={light}>{item}</FormLabel>
              <FormRadio value={item} darkMode={darkMode} />
            </>
          )}
        </div>
      ))}
    </RadioGroup>
  );
}

export function FancyFormInput({
  darkMode,
  name,
  label,
  value,
  handleChange,
}: {
  darkMode: boolean;
  name: string;
  label: string;
  value?: string;
  handleChange: (name: string, value: string | number | boolean) => void;
}) {
  return (
    <div
      className={`h-12 rounded border p-[1px] text-start ${darkMode ? "border-gray-400 bg-gray-900" : "border-gray-500 bg-white"}`}
    >
      <Label>
        <span
          className={`absolute z-10 -translate-y-4 translate-x-2 px-1 font-light ${darkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-600"}`}
        >
          {label}
        </span>
      </Label>
      <Input
        className={`h-full w-full p-1 pl-3 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white"}`}
        name={name}
        type={"text"}
        value={value}
        onChange={(e) => handleChange(name, e.target.value)}
      />
    </div>
  );
}

export function FancyFileInput({
  darkMode,
  name,
  label,
  handleChange,
}: {
  darkMode: boolean;
  name: string;
  label: string;
  handleChange: (name: string, value: string | number | boolean) => void;
}) {
  return (
    <div
      className={`h-14 rounded border border-dotted p-[1px] text-start ${darkMode ? "border-gray-400 bg-gray-900" : "border-gray-500 bg-white"}`}
    >
      <Label>
        <span
          className={`absolute z-10 -translate-y-4 translate-x-2 px-1 font-light ${darkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-600"}`}
        >
          {label}
        </span>
      </Label>
      <Input
        className={`h-full w-full pl-3 pt-4 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-600"}`}
        name={name}
        type={"file"}
        onChange={(e) => handleChange(name, e.target.value)}
      />
    </div>
  );
}
