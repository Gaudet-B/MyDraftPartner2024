import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

export function FormSelectGroup({
  items,
  handleChange,
  selected,
  setSelected,
}: {
  items: Array<number | string>;
  handleChange: (i: string | number) => void;
  selected: number | boolean | string;
  setSelected: () => void;
}) {
  return (
    <div
      className={`rounded-lg border border-gray-400`}
      style={{ minHeight: "52px", width: "fit-content" }}
    >
      <Listbox value={selected} onChange={setSelected}>
        <div
          className={`relative flex h-full rounded-lg border border-gray-400 font-bold`}
          style={{ width: "fit-content", padding: "2px" }}
        >
          <ListboxButton
            className={`relative flex h-full cursor-pointer items-center justify-center ${
              selected === "-"
                ? "bg-sky-100 text-sky-900"
                : "border border-sky-100 bg-sky-900"
            } w-10 rounded-md text-left text-white focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300`}
          >
            <span className={``}>{selected}</span>
            {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span> */}
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={`absolute mt-1 w-full overflow-auto rounded-lg border-2 bg-sky-100 py-1 text-base text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {items.map((item: any, idx: number) => (
                <ListboxOption
                  key={idx}
                  className={({ active, selected }) =>
                    `relative flex h-10 cursor-default select-none items-center justify-center rounded text-black ${
                      active ? "bg-sky-900 text-sky-100" : "text-gray-900"
                    } ${selected ? "bg-sky-400 bg-opacity-70 text-sky-900" : ""}`
                  }
                  style={{ textShadow: "none" }}
                  value={item}
                  onClick={() => handleChange(item)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={` ${
                          selected ? "font-bold" : "font-semibold"
                        }`}
                      >
                        {item}
                      </span>
                      {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
