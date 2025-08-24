import type { PropsWithChildren } from "react";
export default function Badge({ children }: PropsWithChildren) {
  return <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs text-gray-700 bg-white">{children}</span>;
}
