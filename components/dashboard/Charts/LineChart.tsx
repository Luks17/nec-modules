"use client";

import type { ChartProps } from "@/lib/ui/charts/Chart";
import {
  extractThemeColorsFromDOM,
  type ThemeColors,
} from "@/lib/ui/colors/extract";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ items }: ChartProps) {
  const [themeColors, setThemeColors] = useState<ThemeColors | null>(null);

  useEffect(() => {
    const themes = extractThemeColorsFromDOM();
    setThemeColors(themes);
  }, []);

  return (
    <Line
      data={{
        labels: items.map((item) => item.label),
        datasets: [
          {
            label: "Quantidade",
            data: items.map((item) => item.value),
            backgroundColor: themeColors?.primary,
            borderColor: themeColors?.primary,
          },
        ],
      }}
    />
  );
}

export default LineChart;
