"use client";

import ClickSpark from "@/components/ClickSpark";

export function BitsLayer({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark
      sparkColor="#c8102e"
      sparkSize={10}
      sparkRadius={18}
      sparkCount={8}
      duration={420}
      extraScale={1.1}
    >
      {children}
    </ClickSpark>
  );
}
