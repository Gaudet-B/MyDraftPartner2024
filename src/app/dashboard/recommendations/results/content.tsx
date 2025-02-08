"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import React from "react";
import { useRecsFormContext } from "../context/RecsFormContext";

export function ResultsContent({
  children,
}: {
  children: Array<
    React.ReactElement<{ theme: "light" | "dark" } & Record<string, unknown>>
  >;
}) {
  const theme = useAtomValue(useThemeAtom);

  const { showRecommendations, handleShowRecommendations, handleShowSettings } =
    useRecsFormContext();

  useEffect(() => {
    if (!showRecommendations) {
      handleShowRecommendations();
    }
    return () => {
      if (showRecommendations) {
        handleShowSettings();
      }
    };
  });

  return (
    <>
      {children.map((child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { theme });
        }
        return child;
      })}
    </>
  );
}
