"use client";

import { ProgressBarProps } from "@/types/ui/progressBar";

export default function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const widthPercent = (step / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${widthPercent}%` }}
      ></div>
    </div>
  );
}
