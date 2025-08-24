import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export default function Select({ label, className = "", ...props }: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={`w-full h-10 rounded-lg border bg-white px-3 text-sm outline-none focus:border-gray-900 ${className}`}
        {...props}
      />
    </div>
  );
}
