import type { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; };
export default function TextField({ label, hint, className="", ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <input
        className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none ring-0 transition focus:border-gray-900 ${className}`}
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}
