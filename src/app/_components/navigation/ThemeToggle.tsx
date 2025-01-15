import { PropsWithChildren, useState } from "react";
import { Switch } from "@headlessui/react";
import { useAtom } from "jotai";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";

function SwitchWrapper({
  handleChange,
  children,
}: PropsWithChildren<{
  handleChange: (e: React.MouseEvent<HTMLDivElement>) => void;
}>) {
  return (
    <div className="h-6 w-12" onClick={(e) => handleChange(e)}>
      {children}
    </div>
  );
}

/** @TODO make these into SVGs... */
function LightImg() {
  return (
    <img
      src={"https://cdn-icons-png.flaticon.com/512/1415/1415431.png"}
      style={{ filter: "invert(100%)" }}
      className={`ml-1`}
      height={16}
      width={16}
    />
  );
}

/** @TODO this might not work... */
function DarkImg() {
  return (
    <img
      src={"https://cdn-icons-png.flaticon.com/512/606/606795.png"}
      className={`mr-1`}
      height={16}
      width={16}
    />
  );
}

function SwitchCircle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`${
        enabled ? "translate-x-[26px] bg-white" : "translate-x-1 bg-black"
      } absolute inline-block h-4 w-4 rounded-full transition-transform duration-200 ease-out`}
    />
  );
}

function SwitchText({ children }: { children: string }) {
  return <span className="sr-only">{children}</span>;
}

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);
  const [_, setThemeAtom] = useAtom(useThemeAtom);

  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setEnabled(!enabled);
    setThemeAtom();
  };

  return (
    <SwitchWrapper handleChange={handleChange}>
      <Switch
        defaultChecked={enabled}
        className={`relative z-10 flex h-6 w-12 flex-row items-center justify-between rounded-full border ${enabled ? "border-white bg-black" : "border-black bg-white"}`}
        style={{
          boxShadow: `rgb(${
            enabled ? "255 255 255 / 65%" : "0 0 0 / 25%"
          }) 0px 1px 1px 0px`,
        }}
      >
        <LightImg />
        <SwitchText>{"Enable dark mode"}</SwitchText>
        <SwitchCircle enabled={enabled} />
        <DarkImg />
      </Switch>
    </SwitchWrapper>
  );
}
