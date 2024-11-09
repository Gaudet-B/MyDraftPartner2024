"use client";

import { Dispatch, SetStateAction } from "react";
import { RadioGroup as RG, Label, Radio } from "@headlessui/react";
import { animated, useSpring } from "@react-spring/web";

function RadioTab({
  index,
  lastIndex,
  key,
  value,
  name,
  form,
  selected,
  onClick,
}: {
  index: number;
  lastIndex: number;
  key: string;
  value: number;
  name: string;
  form: string;
  selected: boolean;
  onClick: (value: number) => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, value: number) => {
    e.preventDefault();
    onClick(value);
  };

  const { x } = useSpring({
    from: { x: 0 },
    x: selected ? 1 : 0,
    config: { duration: 300 },
  });

  const rounded =
    index === 0 ? "rounded-l-md" : index === lastIndex ? "rounded-r-md" : "";

  return (
    <div
      className={`${
        form === "draft position" ? "w-6" : "w-10"
      } h-full ${rounded}`}
      onClick={(e) => handleClick(e, value)}
    >
      <animated.div
        className={`h-full ${rounded}`}
        style={{
          scale: x.to({
            range: [0, 0.5, 0.5, 0.5, 1],
            output: [1, 1.1, 0.9, 1.03, 1],
          }),
        }}
      >
        <Radio
          key={key}
          value={value}
          className={({ hover, focus, checked }) =>
            `text-gray-800 ${
              focus || hover
                ? "text-white ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                : ""
            } ${
              checked
                ? "z-10 bg-sky-900 text-current ring-2 ring-sky-300 ring-opacity-60"
                : "bg-sky-100"
            } ${
              !focus && !hover && !checked ? rounded : ""
            } z-1 relative flex h-full cursor-pointer items-center justify-center bg-opacity-100 shadow-md focus:outline-none`
          }
        >
          {/** @TODO might not want to check 'hover' here... */}
          {({ hover, focus, checked }) => (
            <div>
              <Label
                as={"span"}
                className={`m-auto ${
                  focus || checked || hover ? "text-white" : "text-sky-900"
                }`}
              >
                {name}
              </Label>
            </div>
          )}
        </Radio>
      </animated.div>
    </div>
  );
}

export default function RadioGroup({
  selected,
  setSelected,
  handleClick,
  form,
  items,
}: {
  // these two are for the headlessui radio group
  selected: number | boolean | string;
  setSelected: Dispatch<SetStateAction<any>>;
  // this one is for the form functionality
  handleClick: (value: number | boolean | string) => void;
  // this is for the screen reader label
  form: string;
  // this is the array of radio inputs
  items: string[] | number[];
}) {
  return (
    <div
      className={`rounded-lg border border-gray-400 font-bold`}
      style={{
        textShadow: "none",
        width: "fit-content",
        height: `${form === "draft position" ? "36px" : "52px"}`,
      }}
    >
      <div
        className={`h-full rounded-lg border border-gray-400 font-bold`}
        style={{ textShadow: "none", width: "fit-content" }}
      >
        <RG
          value={selected}
          onChange={setSelected}
          className={`flex h-full flex-row gap-1 rounded-lg bg-gray-500`}
          style={{ width: "fit-content", padding: "2px", gap: "3px" }}
        >
          <Label className={"sr-only"}>{`${form} form`}</Label>
          {items.map((item: any, idx: number) => {
            return (
              <RadioTab
                key={`${form}-${item}`}
                index={idx}
                lastIndex={items.length - 1}
                onClick={handleClick}
                name={`${item}`}
                form={form}
                selected={selected === item || false}
                value={item}
              />
            );
          })}
        </RG>
      </div>
    </div>
  );
}