import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { DashboardSidebar } from "../../app/dashboard/sidebar";
import { useAtom } from "jotai";

vi.mock("jotai", () => ({
  useAtom: () => ["light"],
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/dashboard/analysis"),
}));

vi.mock("@designsystem/theme/hooks/useThemeEffect", () => ({
  default: vi.fn(),
}));

vi.mock("@designsystem/theme/atoms/useThemeAtom", () => ({
  default: vi.fn(),
}));

// const mockUseAtom = vi.mock("useAtom", () => vi.fn(() => ["light"]));

describe("DashboardSidebar", () => {
  // beforeEach(() => {
  //   mockUseAtom.returnValue(["light"]);
  // });

  it("renders the sidebar with buttons", () => {
    render(<DashboardSidebar />);

    // Check if the sidebar renders correctly
    expect(screen.getByTestId("hamburger-icon")).toBeDefined();
    expect(screen.getByText("RECOMMENDATIONS")).toBeDefined();
    expect(screen.getByText("TEAMS")).toBeDefined();
    expect(screen.getByText("ANALYSIS")).toBeDefined();
    expect(screen.getByText("SETTINGS")).toBeDefined();
  });

  it("toggles expand and contract states correctly", () => {
    render(<DashboardSidebar />);

    const hamburgerIcon = screen.getByTestId("hamburger-icon");

    // Click to expand
    fireEvent.click(hamburgerIcon);
    expect(screen.queryByText("RECOMMENDATIONS")).toBeDefined();

    // Click to contract
    fireEvent.click(hamburgerIcon);
    expect(screen.queryByText("RECOMMENDATIONS")).not.toBeDefined();
  });

  // it("displays the correct button icons", () => {
  //   render(<DashboardSidebar />);

  //   expect(screen.getByTestId("robot-icon")).toBeDefined();
  //   expect(screen.getByTestId("users-icon")).toBeDefined();
  //   expect(screen.getByTestId("line-go-up-icon")).toBeDefined();
  //   expect(screen.getByTestId("settings-icon")).toBeDefined();
  // });

  /** @TODO this is testing for light mode - fix it */
  it("applies dark mode styles when darkMode is active", () => {
    // mockUseAtom.mockReturnValue(["dark"]);
    render(<DashboardSidebar />);

    const sidebar =
      screen.getByTestId("hamburger-icon").parentElement?.parentElement;
    console.log("sidebar", sidebar);
    expect(sidebar).toHaveProperty(
      "className",
      "flex h-full flex-col items-stretch justify-start gap-5 p-1 pt-2 transition-all delay-75 duration-200 ease-in w-[76px] bg-zinc-50",
    );
  });
});
