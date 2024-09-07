"use client";

import type { ChartProps } from "@/lib/ui/charts/Chart";
import {
  extractThemeColorsFromDOM,
  type ThemeColors,
} from "@/lib/ui/colors/extract";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

function PizzaChart({ items }: ChartProps) {
  const [themeColors, setThemeColors] = useState<ThemeColors | null>(null);

  useEffect(() => {
    const themes = extractThemeColorsFromDOM();
    setThemeColors(themes);
  }, []);

  return (
    <Doughnut
      data={{
        labels: items.map((item) => item.label),
        datasets: [
          {
            label: "Quantidade",
            data: items.map((item) => item.value),
            backgroundColor: [
              themeColors?.primary,
              themeColors?.secondary,
              themeColors?.success,
              themeColors?.error,
              themeColors?.warning,
              themeColors?.info,
            ],
            borderColor: [
              themeColors?.primary,
              themeColors?.secondary,
              themeColors?.success,
              themeColors?.error,
              themeColors?.warning,
              themeColors?.info,
            ],
          },
        ],
      }}
    />
  );
}

export default PizzaChart;
