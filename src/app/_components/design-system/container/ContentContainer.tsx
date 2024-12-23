import { Component, PropsWithChildren } from "react";
import transition from "../class-names/transition";
import { backgroundColors } from "../colors";

function BoxyContainer({
  children,
  darkMode = false,
}: PropsWithChildren<{ darkMode: boolean }>) {
  const activeClasses = darkMode
    ? "bg-gray-700 font-semibold border-gray-900 text-gray-100"
    : "bg-gray-300 border-gray-100 text-gray-900";
  return (
    <div
      className={`tracking-light content-container relative z-10 flex flex-col items-center overflow-auto rounded-2xl border bg-opacity-90 p-5 text-center shadow-lg ${activeClasses} `}
    >
      {children}
    </div>
  );
}

function ScrollableContainer({ children }: PropsWithChildren) {
  return <div className="h-[80vh] overflow-auto">{children}</div>;
}

function WideContainer({
  children,
  darkMode,
}: PropsWithChildren<{
  darkMode: boolean;
}>) {
  const colorClasses = {
    primary: darkMode
      ? `${backgroundColors.darkAccent}`
      : `${backgroundColors.lightAccent}`,
    secondary: darkMode
      ? `${backgroundColors.dark}`
      : `${backgroundColors.light}`,
  };

  return (
    <div
      className={`z-10 w-full max-w-[900px] rounded-3xl bg-opacity-80 px-[1px] py-3 shadow-lg ${transition.standard} ${colorClasses.primary}`}
    >
      <div
        className={`h-full w-full rounded-xl bg-opacity-50 ${transition.standard} ${colorClasses.secondary}`}
      >
        {children}
      </div>
    </div>
  );
}

interface ContentContainerProps {
  darkMode: boolean;
}
export default class ContentContainer extends Component<ContentContainerProps> {
  static Boxy: (props: PropsWithChildren) => JSX.Element;
  static Scrollable: (props: PropsWithChildren) => JSX.Element;
  static Wide: (props: PropsWithChildren) => JSX.Element;
  constructor(props: ContentContainerProps) {
    super(props);
    this.Boxy = this.Boxy.bind(this);
    this.Scrollable = this.Scrollable.bind(this);
    this.Wide = this.Wide.bind(this);
  }

  Boxy = (props: PropsWithChildren) => {
    return (
      <BoxyContainer darkMode={this.props.darkMode}>
        {props.children}
      </BoxyContainer>
    );
  };

  Scrollable = (props: PropsWithChildren) => {
    return <ScrollableContainer>{props.children}</ScrollableContainer>;
  };

  Wide = (props: PropsWithChildren) => {
    return (
      <WideContainer darkMode={this.props.darkMode}>
        {props.children}
      </WideContainer>
    );
  };
}
