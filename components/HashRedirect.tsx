"use client";

import { useEffect } from "react";

export function HashRedirect({ anchor }: { anchor: "work" | "resume" }) {
  useEffect(() => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/#${anchor}`);
  }, [anchor]);

  return <p>正在返回首页…</p>;
}
