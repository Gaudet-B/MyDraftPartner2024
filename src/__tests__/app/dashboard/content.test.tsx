import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DashBoardContent, { BackgroundLogo } from "../../app/dashboard/content";

vi.mock("jotai", () => ({
  useAtom: () => ["light"],
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

vi.mock("@designsystem/container/ContentContainer", () => ({
  default: class MockContentContainer {
    Boxy = ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    );
  },
}));

vi.mock("@designsystem/theme/hooks/useThemeEffect", () => ({
  default: vi.fn(),
}));

vi.mock("@designsystem/theme/atoms/useThemeAtom", () => ({
  default: vi.fn(),
}));

vi.mock("@components/background/SvgBuilder", () => ({
  BgSvgBuilder: ({ dimensions }: { dimensions: any }) => (
    <svg data-testid="svg-builder">{dimensions && <rect />}</svg>
  ),
}));

vi.mock("@components/background/dimensions", () => ({
  getDimensions: vi.fn(() => ({ height: 100, width: 100 })),
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("BackgroundLogo", () => {
  it("renders with correct dimensions", () => {
    render(
      <BackgroundLogo containerHeight={500} containerRef={{ current: null }} />,
    );

    expect(screen.getByTestId("svg-builder")).toBeDefined();
  });
});

describe("DashBoardContent", () => {
  it("renders correct number of dashboard links", () => {
    render(<DashBoardContent hasDarkMode={false} />);
    const links = screen.queryAllByRole("button", { hidden: true });
    expect(links.length).toEqual(5);
  });
});
